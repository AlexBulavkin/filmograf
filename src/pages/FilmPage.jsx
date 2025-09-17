import { Box, Button, Flex, Heading, Icon, Image, Text, Spinner } from "@chakra-ui/react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import axios from "axios";
import genresList from "../components/genresList";
import { GoClock } from "react-icons/go";

export default function FilmPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log("Film ID:", id);
  
  const [film, setFilm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchFilm() {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:8000/movies/${id}`);
        console.log("Film data:", res.data);
        setFilm(res.data);
      } catch (err) {
        console.log("Ошибка загрузки данных", err);
        setError("Ошибка загрузки данных");
      } finally {
        setLoading(false);
      }
    }
    
    if (id) {
      fetchFilm();
    }
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/movies/${id}`);
      navigate("/");
    } catch (err) {
      console.log("Ошибка удаления фильма", err);
      setError("Не удалось удалить фильм");
    }
  };

  
  async function updateIsFavorite(filmId, value) {
      try {
          console.log("Updating film:", filmId, "to:", value);
          
          const response = await axios.patch(
              `http://localhost:8000/movies/${filmId}`,
              {
                  is_favorite: value
              },
              {
                  headers: {
                      'Content-Type': 'application/json'
                  }
              }
          );
          
          console.log("Update successful:", response.data);
          
          setFilm(prevFilm => 
                  prevFilm.id === filmId 
                      ? { ...film, is_favorite: value }
                      : film
          );

      } catch (error) {
          console.error("Error updating favorite:", error);
          if (error.response) {
              console.error("Response data:", error.response.data);
              console.error("Response status:", error.response.status);
          }
          setError("Ошибка при обновлении избранного");
      }
  }

  if (loading) {
    return (
      <Flex justify="center" align="center" minH="400px">
        <Spinner size="xl" />
        <Text ml="4">Загрузка...</Text>
      </Flex>
    );
  }

  if (error || !film) {
    return (
      <Flex justify="center" align="center" minH="400px">
        <Text>Ошибка загрузки фильма</Text>
      </Flex>
    );
  }

  const handleFavoriteClick = (film) => {
      console.log("Current film:", film);
      updateIsFavorite(film.id, !film.is_favorite);
  };

  const genreMap = new Map(genresList.map(g => [g.title, g.color]));
  
  return (
    <Flex w="1165px" gap="60px">
      <Image
      src={film.image_url}
      w="480px"
      h="480px"
      fit={"cover"}
      >
      </Image>
      <Flex direction="column">
        <Flex justify={"space-between"} align={"center"} w="625px" mb="20px">
          <Heading fontSize="40px" fontWeight="bold"> {film.title} </Heading>
          <Icon 
                color={"#F9A62B"} 
                cursor="pointer"
                onClick={() => handleFavoriteClick(film)}
                as={film.is_favorite ? FaStar : FaRegStar}
          />
        </Flex>
        <Flex align={"center"} w="625px" mb="20px" gap="10px">
          <Box bg={`${genreMap.get(film.genre) || "black"}.100`} rounded={"20px"} mr="15px">
              <Text p={"5px"} color={genreMap.get(film.genre) || "black"} fontSize="14px" fontWeight={"medium"}>{film.genre}</Text>
          </Box>
          <Icon>
              <GoClock />
          </Icon>
          <Text  fontSize="14px" fontWeight={"regular"}> {film.duration} мин. </Text>
        </Flex>
        <Text fontSize={"16px"} > {film.description} </Text>  
        <Flex gap={"10px"} justify={"end"}>
          <Button variant={"outline"} as={Link} to={`/edit_film/${film.id}`} colorPalette="blue" borderBottomWidth="1px" borderColor={"#DEE2E6"}> Редактировать </Button>
          <Button variant={"outline"} colorPalette="blue" borderBottomWidth="1px" borderColor={"#DEE2E6"} onClick={handleDelete}> Удалить </Button>
        </Flex>   
      </Flex>

    </Flex>
  );
}
import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { GoClock } from "react-icons/go";
import { useState, useEffect } from "react";
import axios from "axios";

export default function SavedPage() {
  const [films, setFilms] = useState([]);

  useEffect(() => {
      async function fetchFilms() {
          try {
              const res = await axios.get("http://localhost:8000/movies/favorites");
              setFilms(res.data);
          } catch (err) {
              setError("Ошибка загрузки данных");
          }
      }
      fetchFilms();
  }, []);


  const removeFromFavorites = async (filmId) => {
    try {      
      const response = await axios.patch(
        `http://localhost:8000/movies/${filmId}`,
        {
          is_favorite: false
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      setFilms(prevFilms => prevFilms.filter(film => film.id !== filmId));
      
    } catch (error) {
      console.error("Error removing from favorites:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      }
      setError("Ошибка при удалении из избранного");
    }
  };

  if (films.length === 0) {
    return (
      <Box>
        <Heading fontSize="40px" fontWeight="bold" my={"30px"}>Избранное</Heading>
        <Text>У вас пока нет избранных фильмов</Text>
      </Box>
    );
  }

  return (
    <Box>
      <Heading fontSize="40px" fontWeight="bold" my={"30px"}>Избранное</Heading>
      {films.map((film) => (
        <Flex 
          key={film.id} 
          direction={"column"} 
          w={"598px"} 
          borderBottomWidth="1px" 
          borderColor={"#DEE2E6"}
          pb="20px"
          mb="20px"
        >
          <Flex align="center">
            <Image
              src={film.image_url}
              w="91px"
              h="91px"
              fit={"cover"}
              rounded={"full"}
              alt="Постер"
            />
            <Flex direction={"column"} p="30px" gap="10px" w="275px">
              <Text fontSize={"16px"} fontWeight="medium">{film.title}</Text>
              <Flex gap="10px" align="center">
                <GoClock />
                <Text>{film.duration} мин.</Text>
              </Flex>       
            </Flex>
            <Button 
              color="gray.400"
              onClick={() => removeFromFavorites(film.id)}
              _hover={{color: "black"}}
            >
              Удалить
            </Button>
          </Flex>
        </Flex>
      ))}
    </Box>
  );
}
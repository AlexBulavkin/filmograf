import { Box, Button, Flex, Heading, Icon, Image, Text} from "@chakra-ui/react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { useParams, Link } from "react-router";
import { useState } from "react";
import filmsList from "../components/filmsList";
import { useFavorites } from "../components/useFavorites";
import genresList from "../components/genresList";
import { GoClock } from "react-icons/go";

export default function FilmPage() {
  const param = useParams();
  
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const handleFavoriteClick = (film) => {
      if (isFavorite(film.id)) {
          removeFromFavorites(film.id);
      } else {
          addToFavorites(film);
      }
  };

  const film = filmsList[param.id - 1]

  const [genres, setGenres] = useState(genresList);
  const genreMap = new Map(genres.map(g => [g.title, g.color]));

  
  return (
    <Flex w="1165px" gap="60px">
      <Image
      src={film.src}
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
              as={isFavorite(film.id) ? FaStar : FaRegStar}
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
          <Button variant={"outline"} colorPalette="blue" borderBottomWidth="1px" borderColor={"#DEE2E6"}> Удалить </Button>
        </Flex>   
      </Flex>

    </Flex>
  );
}
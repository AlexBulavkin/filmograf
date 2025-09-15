import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { GoClock } from "react-icons/go";
import { useFavorites } from "../components/useFavorites";

export default function SavedPage() {
  const { favorites, removeFromFavorites } = useFavorites();

  if (favorites.length === 0) {
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
      {favorites.map((film) => (
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
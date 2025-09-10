import { Box, Grid, Flex, Icon, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router";
import { FaRegStar } from "react-icons/fa";
import { GoClock } from "react-icons/go";
import { useState } from "react";
import filmsList from "./filmsList"
import genresList from "./genresList";

export default function Films() {
    const [films, setFilms] = useState(filmsList);
    const activeFilms = films.filter((film) => film.genre === "Триллер")


    const [genres, setGenres] = useState(genresList);
    const genreMap = new Map(genres.map(g => [g.title, g.color]));
    return (
    <Grid templateColumns="repeat(3, 1fr)" gap="61px">
        {activeFilms.map((film) => (
            <Box key={film.id} borderWidth="1px" borderColor={"#DEE2E6"} rounded={"20px"} h={"350px"} w={"325px"}>
                <Image
                 src={film.src}
                 fit={"cover"}
                 roundedTop={"20px"}
                 alt="Постер"
                />
                <Text 
                color={"black"} fontSize="22px" fontWeight={"semibold"} 
                my={'20px'} mx={'20px'}>
                    <Link to={`/film/${film.id}`} >{film.title} </Link>
                </Text>  
                <Flex justify={'space-between'} align={"center"} my={'20px'} mx={'20px'}>
                    <Box bg={`${genreMap.get(film.genre) || "black"}.100`} rounded={"20px"}>
                        <Text p={"5px"} color={genreMap.get(film.genre) || "black"} fontSize="14px" fontWeight={"medium"}>{film.genre}</Text>
                    </Box>
                    <Flex gap="5px">
                        <Icon color={"black"}>
                            <GoClock />
                        </Icon>
                        <Text color={"black"} fontSize="14px" fontWeight={"regular"}> {film.duration} мин. </Text>                     
                    </Flex>
                    <Icon color={"#F9A62B"}>
                        <FaRegStar />
                    </Icon>
                </Flex>
            </Box>
        ))}
    </Grid>
    )
}



import { Box, Checkbox, Grid, Flex, Heading, Icon, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router";
import { FaRegStar, FaStar } from "react-icons/fa";
import { GoClock } from "react-icons/go";
import { useState } from "react";
import filmsList from "./filmsList"
import genresList from "./genresList";
import { useFavorites } from "./useFavorites";

export function Filters({ selectedGenres, onGenreChange }) {
    const [filters, setFilters] = useState(genresList);
    
    const handleCheckboxChange = (genreTitle) => {
        if (selectedGenres.includes(genreTitle)) {
            onGenreChange(selectedGenres.filter(genre => genre !== genreTitle));
        } else {
            onGenreChange([...selectedGenres, genreTitle]);
        }
    };

    return (
        <Flex gap={'10px'} wrap="wrap">
            {filters.map((filter) => (
                <Flex key={filter.id} align={"center"} gap={'10px'}>
                    <Flex gap={'5px'}>
                        <Checkbox.Root 
                            colorPalette={`${filter.color}`}
                            checked={selectedGenres.includes(filter.title)}
                            onCheckedChange={() => handleCheckboxChange(filter.title)}
                        >
                            <Checkbox.HiddenInput />
                            <Checkbox.Control rounded={"full"} >
                                <Checkbox.Indicator />
                            </Checkbox.Control>
                            <Checkbox.Label fontSize={"16px"} fontWeight={"medium"}> 
                                {filter.title} 
                            </Checkbox.Label>
                        </Checkbox.Root>
                    </Flex>
                </Flex>
            ))}
        </Flex>
    )
};

export default function Films() {
    const [films, setFilms] = useState(filmsList);
    const [genres, setGenres] = useState(genresList);
    
    const allGenres = genres.map(genre => genre.title);
    const [selectedGenres, setSelectedGenres] = useState(allGenres);
    
    const genreMap = new Map(genres.map(g => [g.title, g.color]));
    
    const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

    const filteredFilms = selectedGenres.length === allGenres.length
        ? films
        : selectedGenres.length > 0
            ? films.filter(film => selectedGenres.includes(film.genre))
            : [];

    const handleFavoriteClick = (film) => {
        if (isFavorite(film.id)) {
            removeFromFavorites(film.id);
        } else {
            addToFavorites(film);
        }
    };

    return (
        <>
        <Flex justify={"space-between"} my="30px"  mr="30px">
            <Heading fontSize="40px" fontWeight="bold">Фильмы</Heading>
            <Filters 
                selectedGenres={selectedGenres} 
                onGenreChange={setSelectedGenres} 
            />
        </Flex>
        <Grid templateColumns="repeat(3, 1fr)" gap="61px">
                {filteredFilms.map((film) => (
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
                                <Icon>
                                    <GoClock />
                                </Icon>
                                <Text fontSize="14px" fontWeight={"regular"}> {film.duration} мин. </Text>                     
                            </Flex>
                            <Icon 
                                color={"#F9A62B"} 
                                cursor="pointer"
                                onClick={() => handleFavoriteClick(film)}
                                as={isFavorite(film.id) ? FaStar : FaRegStar}
                            />
                        </Flex>
                    </Box>
                ))
            }
        </Grid>
        </>
    )
}
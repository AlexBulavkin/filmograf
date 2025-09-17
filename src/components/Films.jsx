import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router";
import { GoClock } from "react-icons/go";
import { FaRegStar, FaStar } from "react-icons/fa";
import { Box, Checkbox, Grid, Flex, Heading, Icon, Image, Text } from "@chakra-ui/react";
import genresList from "./genresList";

export default function Films (){
    
    const [films, setFilms] = useState([]);
    const [allFilms, setAllFilms] = useState([]);
    const [error, setError] = useState("");

    const addFilms = (genreTitle) => {
        const newFilms = allFilms.filter((film) => film.genre == genreTitle);
        setFilms((prevFilms) => [...prevFilms, ...newFilms]);
    };
    
    const removeFilms = (genreTitle) => {
        setFilms(films.filter((film) => film.genre !== genreTitle));
    };

    useEffect(() => {
        async function fetchFilms() {
            try {
                const res = await axios.get("http://localhost:8000/movies");
                setFilms(res.data);
                setAllFilms(res.data);
            } catch (err) {
                setError("Ошибка загрузки данных");
            }
        }
        fetchFilms();
    }, []);

    async function updateIsFavorite(filmId, value) {
        try {
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
            
            // Обновляем состояние
            setFilms(prevFilms => 
                prevFilms.map(film => 
                    film.id === filmId 
                        ? { ...film, is_favorite: value }
                        : film
                )
            );
            
            setAllFilms(prevFilms => 
                prevFilms.map(film => 
                    film.id === filmId 
                        ? { ...film, is_favorite: value }
                        : film
                )
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

    const genres = genresList;
    const genreToColorMap = new Map(genres.map(genre=> [genre.title, genre.color]));
    const genresTitles = genres.map(genre => genre.title);
    const [selectedGenres, setSelectedGenres] = useState(genresTitles);

    const addGenre = (genreTitle) => {
        setSelectedGenres([...selectedGenres, genreTitle]);
    };

    const removeGenre = (genreTitle) => {
        setSelectedGenres(selectedGenres.filter((genre) => genre !== genreTitle));
    };
    
    const handleCheckboxChange = (genreTitle) => {
        if (selectedGenres.includes(genreTitle)) {
            removeGenre(genreTitle);
            removeFilms(genreTitle);
        } else {
            addGenre(genreTitle);
            addFilms(genreTitle);
        }
    };

    const handleFavoriteClick = (film) => {
        updateIsFavorite(film.id, !film.is_favorite);
    };

    return (
        <>
        <Flex justify={"space-between"} my="30px"  mr="30px">
            <Heading fontSize="40px" fontWeight="bold">Фильмы</Heading>
            <Flex gap={'10px'} wrap="wrap">
                {genres.map((filter) => (
                    <Flex key={filter.id} align={"center"} gap={'10px'}>
                        <Flex gap={'5px'}>
                            <Checkbox.Root
                                colorPalette={`${filter.color}`}
                                checked={selectedGenres.includes(filter.title)}
                                onCheckedChange={() => handleCheckboxChange(filter.title)}
                            >
                                <Checkbox.HiddenInput />
                                <Checkbox.Control rounded={"full"} borderColor={`${filter.color}.400`}>
                                    <Checkbox.Indicator color={"white"}></Checkbox.Indicator>
                                </Checkbox.Control >
                                <Checkbox.Label fontSize={"16px"} fontWeight={"medium"}> 
                                    {filter.title} 
                                </Checkbox.Label>
                            </Checkbox.Root>
                        </Flex>
                    </Flex>
                ))}
            </Flex>
        </Flex>
        
        {error && <Text color="red.500">{error}</Text>}
        
        <Grid templateColumns="repeat(3, 1fr)" gap="61px">
            {films.map((film) => (
                <Box key={film.id} borderWidth="1px" borderColor={"#DEE2E6"} rounded={"20px"} h={"350px"} w={"325px"} overflow="hidden">
                    <Image
                        src={film.image_url}
                        fit={"cover"}
                        roundedTop={"20px"}
                        alt={`Постер фильма "${film.title}"`}
                        h="150px"
                        w="100%"
                        objectFit="cover"
                    />
                    <Text 
                        color={"black"} fontSize="22px" fontWeight={"semibold"} 
                        my={'20px'} mx={'20px'}>
                            <Link to={`/film/${film.id}`} >{film.title} </Link>
                    </Text>  
                    <Flex justify={'space-between'} align={"center"} my={'20px'} mx={'20px'}>
                        <Box
                            bg={`${genreToColorMap.get(film.genre) || "black"}.100`}
                            rounded={"20px"}>
                                <Text
                                p={"5px"} 
                                color={genreToColorMap.get(film.genre) || "black"}
                                fontSize="14px" 
                                fontWeight={"medium"}
                                > 
                                {film.genre}
                                </Text>
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
                            as={film.is_favorite ? FaStar : FaRegStar}
                        />
                    </Flex>
                </Box>
            ))}
        </Grid>
        </>
    )
}
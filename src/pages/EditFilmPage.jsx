import { useParams } from "react-router";
import { useState } from "react";
import filmsList from "../components/filmsList"
import genresList from "../components/genresList";
import { Button, FileUpload, Field, Flex, Heading, Input, Checkbox, Text, Textarea } from "@chakra-ui/react";
import { HiUpload } from "react-icons/hi"

export default function EditFilmPage() {
    const param = useParams();
    const film = filmsList[param.id - 1];
    const [genres, setGenres] = useState(genresList);
    const [selectedGenre, setSelectedGenre] = useState(film.genre || "");

    const handleGenreChange = (genreTitle) => {
        setSelectedGenre(genreTitle);
    };

    return (
        <Flex direction={"column"} w={"986px"}>
           <Heading fontSize="40px" fontWeight="bold" mb={"61px"}> Редактировать фильм </Heading>
           <Flex direction={"column"} ml="201px" w={"785px"}  borderWidth={"1px"} borderColor={"#DEE2E6"} pl={"60px"} pt={"60px"} pb={"60px"} pr={"116px"} rounded={"20px"} gap={"20px"}>
                <Field.Root orientation="horizontal">
                    <Field.Label minW="230px" fontSize={"16px"}> Название фильма </Field.Label>
                    <Input borderColor="gray.300" defaultValue={film.title}></Input>
                </Field.Root>
                <Flex>
                    <Text w="220px" userSelect="none">Жанр</Text>
                    <Flex gap={'10px'} wrap="wrap">
                        {genres.map((genre) => (
                            <Flex key={genre.id} align={"center"} gap={'10px'}>
                                <Flex gap={'5px'}>
                                    <Checkbox.Root 
                                        colorPalette={`${genre.color}`}
                                        checked={selectedGenre === genre.title}
                                        onCheckedChange={() => handleGenreChange(genre.title)}
                                    >
                                        <Checkbox.HiddenInput />
                                        <Checkbox.Control
                                            borderColor={`${genre.color}.400`} 
                                            rounded={"full"} 
                                        >
                                            <Checkbox.Indicator color={"white"}></Checkbox.Indicator>
                                        </Checkbox.Control>
                                        <Checkbox.Label fontSize={"16px"} fontWeight={"medium"}> 
                                            {genre.title} 
                                        </Checkbox.Label>
                                    </Checkbox.Root>
                                </Flex>
                            </Flex>
                        ))}
                    </Flex>
                </Flex>
                <Flex gap={"10px"} align={"center"}>
                    <Text  userSelect="none" w={"230px"}>Длительность</Text>
                    <Input type="number" borderColor="gray.300" defaultValue={film.duration} w="84px"></Input>
                    <Text  userSelect="none" >мин</Text>
                </Flex>
                <Field.Root orientation="horizontal">
                    <Field.Label minW="230px" fontSize={"16px"}> Описание </Field.Label>
                    <Textarea borderColor="gray.300" defaultValue={film.description}></Textarea>
                </Field.Root>
                <FileUpload.Root>
                    <FileUpload.HiddenInput />
                    <Flex>
                        <Text  userSelect="none" w={"230px"}>Загрузить фото</Text>
                        <FileUpload.Trigger asChild>
                            <Button variant="solid" size="sm">
                            <HiUpload /> Выбрать файл
                            </Button>
                        </FileUpload.Trigger>
                        <FileUpload.List />
                    </Flex>
                </FileUpload.Root>
                <Flex justify={"center"}>
                    <Button variant={"solid"} colorPalette="blue" w={"145px"} h={"48px"}>Сохранить</Button>
                </Flex>
           </Flex>           
        </Flex>
    );
}
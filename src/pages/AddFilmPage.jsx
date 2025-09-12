import { useNavigate } from "react-router";
import genresList from "../components/genresList";
import { Button, FileUpload, Field, Flex, Heading, Input, Checkbox, Text, Textarea } from "@chakra-ui/react";
import { HiUpload } from "react-icons/hi"

export default function AddFilmPage() {

    const navigate = useNavigate();

    return (
        <Flex direction={"column"} w={"986px"}>
           <Heading fontSize="40px" fontWeight="bold" mb={"61px"}> Добавить фильм </Heading>
           <Flex direction={"column"} ml="201px" w={"785px"}  borderWidth={"1px"} borderColor={"#DEE2E6"} pl={"60px"} pt={"60px"} pb={"60px"} pr={"116px"} rounded={"20px"} gap={"20px"}>
                <Field.Root orientation="horizontal">
                    <Field.Label minW="230px" fontSize={"16px"}> Название фильма </Field.Label>
                    <Input borderColor="gray.300" ></Input>
                </Field.Root>
                <Flex>
                    <Text w="220px" userSelect="none">Жанр</Text>
                    <Flex gap={'10px'} wrap="wrap">
                        {genresList.map((genre) => (
                            <Flex key={genre.id} align={"center"} gap={'10px'}>
                                <Flex gap={'5px'}>
                                    <Checkbox.Root 
                                        colorPalette={`${genre.color}`}
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
                    <Input type="number" borderColor="gray.300" w="84px"></Input>
                    <Text  userSelect="none" >мин</Text>
                </Flex>
                <Field.Root orientation="horizontal">
                    <Field.Label minW="230px" fontSize={"16px"}> Описание </Field.Label>
                    <Textarea borderColor="gray.300"></Textarea>
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
                    <Button variant={"solid"} colorPalette="blue" w={"145px"} h={"48px"} onClick={() => navigate("/")}>Сохранить</Button>
                </Flex>
           </Flex>           
        </Flex>
    );
}
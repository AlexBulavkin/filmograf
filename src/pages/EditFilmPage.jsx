import { useState } from "react";
import { useController, useForm } from "react-hook-form";
import { useParams } from "react-router";
// import { useNavigate } from "react-router";
import genresList from "../components/genresList";
import filmsList from "../components/filmsList"
import { Box, Button, FileUpload, Field, Flex, Grid, Heading, Input, Checkbox, Text, Textarea, Fieldset, FieldErrorText, CheckboxGroup, } from "@chakra-ui/react";

export default function EditFilmPage() {
    const param = useParams();

    const [film, setFilm] = useState({
        id: filmsList[param.id - 1].id,
        title: filmsList[param.id - 1].title,
        genre: filmsList[param.id - 1].genre,
        duration: filmsList[param.id - 1].duration,
        description: filmsList[param.id - 1].description,
        image: filmsList[param.id - 1].src
    });

    const updateFilm = (data) => {
        setFilm({ ...film, title: data.title, genre: data.genres[0], duration: data.duration, description: data.description, image: data.image });
    };

    // const navigate = useNavigate();
    const { control, reset, register, setValue, handleSubmit, formState: { errors, isDirty, isValid}} = useForm({mode: "onChange"});

    const genres = useController({
        control,
        name: "genres",
        rules: {
            required: "Необходимо указать жанр"
        }
    })

    const {field: imageField} = useController({
        name: "image",
        control,
        rules: {
            required: "Изображение необходимо",
        }
    });

    const onSubmit = (data) => {
        // console.log(data);
        // console.log(data.title, data.genres, data.duration, data.description, data.image)
        updateFilm(data)
        // reset()
    };

    const isFormValid = isValid && isDirty;

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {console.log(film, "Проверка Стейта")}
            <Flex direction={"column"} w={"986px"}>
            <Heading fontSize="40px" fontWeight="bold" mb={"61px"}> Редактировать фильм </Heading>
            <Flex direction={"column"} ml="201px" w={"785px"}  borderWidth={"1px"} borderColor={"#DEE2E6"} pl={"60px"} pt={"60px"} pb={"60px"} pr={"116px"} rounded={"20px"} gap={"20px"}>
                    <Field.Root orientation="horizontal" invalid={!!errors.title}>
                        <Field.Label minW="220px" fontSize={"16px"}> Название фильма </Field.Label>
                        <Input
                            borderColor="gray.300"
                            {...register("title", (
                                { required: "Название обязательно",
                                  minLength: { value: 3 , message: "Минимум 3 символа" },
                                  maxLength: { value: 200 , message: "Максимум 200 символов" } })
                                )
                            } ></Input>
                        {errors.title && (
                            <FieldErrorText>{ errors.title.message}</FieldErrorText>
                        )}
                    </Field.Root>

                    <Fieldset.Root invalid={!!errors.genres}>
                        <Flex>
                            <Fieldset.Legend userSelect="none" color={"black"} minW="220px" fontSize={"16px"}>Жанр</Fieldset.Legend>
                            <CheckboxGroup
                                invalid={!!errors.genres}
                                value={genres.field.value}
                                onValueChange={genres.field.onChange}
                                name={genres.field.name}
                            >
                            <Fieldset.Content>                           
                            <Flex gap="10px">
                                {genresList.map((genre) => (
                                    <Checkbox.Root 
                                        key={genre.id}
                                        colorPalette={genre.color}
                                        value={genre.title}
                                    >
                                        <Checkbox.HiddenInput/>
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
                                ))}
                            </Flex>
                            </Fieldset.Content>
                            </CheckboxGroup>  
                        </Flex>
                        {errors.genres && (
                            <Fieldset.ErrorText>{errors.genres.message}</Fieldset.ErrorText>
                        )}
                    </Fieldset.Root>

                    <Field.Root orientation="horizontal" invalid={!!errors.duration}>
                        <Flex gap={"10px"} align={"center"}>
                            <Field.Label minW="220px" fontSize={"16px"}> Длительность </Field.Label>
                            <Input type="number" borderColor="gray.300" w="84px" {...register("duration", {required: "Длительность обязательна"})}></Input>
                            <Text  userSelect="none" >мин</Text>
                        </Flex>
                        {errors.duration && (
                            <FieldErrorText>{ errors.duration.message}</FieldErrorText>
                        )}
                    </Field.Root>

                    <Field.Root orientation="horizontal" invalid={!!errors.description}>
                        <Field.Label minW="220px" fontSize={"16px"}> Описание </Field.Label>
                        <Textarea
                            borderColor="gray.300" 
                            {...register("description", {
                                required: "Описание обязательно",
                                minLength: { value: 10 , message: "Минимум 10 символов" },
                                maxLength: { value: 1000 , message: "Максимум 1000 символов" }
                            })}
                            >
                        </Textarea>
                        {errors.description && (
                            <FieldErrorText>{ errors.description.message}</FieldErrorText>
                        )}
                    </Field.Root>

                    <Field.Root orientation="horizontal" invalid={!!errors.image}>
                    <FileUpload.Root {...imageField}>
                        <FileUpload.HiddenInput/>
                        <Grid templateColumns="repeat(3, 1fr)">
                            <FileUpload.Label w={"225px"} fontSize={"16px"}>Загрузить фото</FileUpload.Label>     
                            <FileUpload.Trigger asChild>
                                <Button variant={"subtle"} color={"black"} bg={"gray.200"} w={"173"} h={"48px"} fontSize={"18px"}>
                                 Выбрать файл
                                </Button>
                            </FileUpload.Trigger>
                            <Box ml={"20px"} >
                            <FileUpload.ItemGroup>
                            <FileUpload.Context>
                                {({ acceptedFiles }) =>
                                acceptedFiles.map((file) => (
                                    <FileUpload.Item key={file.name} file={file} bg={"white"} borderWidth={"1px"} borderColor={"#DEE2E6"} h={"48px"} >
                                        <FileUpload.ItemPreview  />
                                        <FileUpload.ItemName color={"black"} fontSize={"18px"}/>
                                    </FileUpload.Item>
                                ))
                                }
                            </FileUpload.Context>
                            </FileUpload.ItemGroup>
                            </Box>
                        </Grid>
                    </FileUpload.Root>
                    {errors.image && (
                        <FieldErrorText>{errors.image.message}</FieldErrorText>
                    )}
                    </Field.Root>
                    {isFormValid ? (
                        <Flex justify={"center"}>
                            <Button type="submit" variant={"solid"} colorPalette="blue" w={"145px"} h={"48px"}>
                                Сохранить
                            </Button>
                        </Flex>
                    ) : (
                        <Flex justify={"center"}>
                            <Button 
                                type="submit" 
                                variant={"solid"} 
                                color={"white"}
                                bg={"blue.400"}
                                w={"145px"} 
                                h={"48px"}
                                disabled={true}
                            >
                                Сохранить
                            </Button>
                        </Flex>
                    )}
                    <Flex justify={"center"}>
                        <Button variant={"solid"} colorPalette="blue" w={"145px"} h={"48px"}
                                onClick={() => (
                                    setValue("title", film.title),
                                    setValue("genres", [film.genre]),
                                    setValue("duration", film.duration),
                                    setValue("description", film.description),
                                    setValue("image", film.src)
    )}>
                            Редактировать
                        </Button>
                    </Flex>
            </Flex>           
            </Flex>
        </form>
    );
}
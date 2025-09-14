import { useController, useForm } from "react-hook-form";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import genresList from "../components/genresList";
import filmsList from "../components/filmsList"
import { Box, Button, FileUpload, Field, Flex, Grid, Heading, Input, Checkbox, Text, Textarea, Fieldset, FieldErrorText, CheckboxGroup, } from "@chakra-ui/react";

export default function EditFilmPage() {
    const param = useParams();
    const film = filmsList[param.id - 1];

    const navigate = useNavigate();
    const { control, register, handleSubmit, formState: { errors}} = useForm();

    const genres = useController({
        control,
        name: "genres",
        defaultValue: [film.genre],
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
        console.log(data);
        console.log(data.title, data.genres, data.duration, data.description, data.image)
        navigate("/")
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Flex direction={"column"} w={"986px"}>
            <Heading fontSize="40px" fontWeight="bold" mb={"61px"}> Редактировать фильм </Heading>
            <Flex direction={"column"} ml="201px" w={"785px"}  borderWidth={"1px"} borderColor={"#DEE2E6"} pl={"60px"} pt={"60px"} pb={"60px"} pr={"116px"} rounded={"20px"} gap={"20px"}>
                    <Field.Root orientation="horizontal" invalid={!!errors.title}>
                        <Field.Label minW="220px" fontSize={"16px"}> Название фильма </Field.Label>
                        <Input
                            defaultValue={film.title}
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
                            <Input defaultValue={film.duration} type="number" borderColor="gray.300" w="84px" {...register("duration", {required: "Длительность обязательна"})}></Input>
                            <Text  userSelect="none" >мин</Text>
                        </Flex>
                        {errors.duration && (
                            <FieldErrorText>{ errors.duration.message}</FieldErrorText>
                        )}
                    </Field.Root>
                    <Field.Root orientation="horizontal" invalid={!!errors.description}>
                        <Field.Label minW="220px" fontSize={"16px"}> Описание </Field.Label>
                        <Textarea
                            defaultValue={film.description}
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
                    <Flex justify={"center"}>
                        <Button type="submit" variant={"solid"} colorPalette="blue" w={"145px"} h={"48px"}>Сохранить</Button>
                    </Flex>
            </Flex>           
            </Flex>
        </form>
    );
}
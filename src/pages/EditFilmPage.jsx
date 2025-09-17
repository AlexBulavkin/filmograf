import { useState, useEffect } from "react";
import { useController, useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import genresList from "../components/genresList";
import { Box, Button, FileUpload, Field, Flex, Grid, Heading, Input, Checkbox, Text, Textarea, Fieldset, FieldErrorText, CheckboxGroup, } from "@chakra-ui/react";

export default function EditFilmPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [film, setFilm] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const { control, register, handleSubmit, formState: { errors, isDirty, isValid }, setValue } = useForm({
        mode: "onChange",
        defaultValues: {
            title: "",
            genres: [],
            duration: "",
            description: ""
        }
    });

    useEffect(() => {
        async function fetchFilm() {
            try {
                setLoading(true);
                const res = await axios.get(`http://localhost:8000/movies/${id}`);
                console.log("Film data:", res.data);
                setFilm(res.data);
                
                // Заполняем форму данными фильма
                setValue("title", res.data.title);
                setValue("genres", [res.data.genre]);
                setValue("duration", res.data.duration.toString());
                setValue("description", res.data.description);
                
            } catch (err) {
                console.log("Ошибка загрузки данных", err);
                setError("Ошибка загрузки данных");
            } finally {
                setLoading(false);
            }
        }
        
        if (id) {
            fetchFilm();
        }
    }, [id, setValue]);

    const genres = useController({
        control,
        name: "genres",
        rules: {
            required: "Необходимо указать жанр"
        }
    });

    const { field: imageField } = useController({
        name: "image",
        control
    });

    const onSubmit = async (data) => {
        try {
            // Подготовка данных для отправки
            const updateData = {
                title: data.title,
                genre: data.genres[0],
                duration: parseInt(data.duration),
                description: data.description
            };

            // Отправка PATCH запроса
            await axios.patch(`http://localhost:8000/movies/${id}`, updateData);
            
            // Перенаправление после успешного обновления
            navigate("/");
        } catch (error) {
            console.error("Ошибка при обновлении фильма:", error);
            setError("Ошибка при сохранении изменений");
        }
    };

    const isFormValid = isValid && isDirty;

    if (loading) {
        return (
            <Flex justify="center" align="center" minH="400px">
                <Text>Загрузка...</Text>
            </Flex>
        );
    }

    if (error || !film) {
        return (
            <Flex justify="center" align="center" minH="400px">
                <Text>{error || "Фильм не найден"}</Text>
            </Flex>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Flex direction={"column"} w={"986px"}>
                <Heading fontSize="40px" fontWeight="bold" mb={"61px"}> Редактировать фильм </Heading>
                <Flex direction={"column"} ml="201px" w={"785px"} borderWidth={"1px"} borderColor={"#DEE2E6"} pl={"60px"} pt={"60px"} pb={"60px"} pr={"116px"} rounded={"20px"} gap={"20px"}>
                    
                    <Field.Root orientation="horizontal" invalid={!!errors.title}>
                        <Field.Label minW="220px" fontSize={"16px"}> Название фильма </Field.Label>
                        <Input
                            borderColor="gray.300"
                            {...register("title", {
                                required: "Название обязательно",
                                minLength: { value: 3, message: "Минимум 3 символа" },
                                maxLength: { value: 200, message: "Максимум 200 символов" }
                            })}
                        />
                        {errors.title && (
                            <FieldErrorText>{errors.title.message}</FieldErrorText>
                        )}
                    </Field.Root>

                    <Fieldset.Root invalid={!!errors.genres}>
                        <Flex>
                            <Fieldset.Legend userSelect="none" color={"black"} minW="220px" fontSize={"16px"}>Жанр</Fieldset.Legend>
                            <CheckboxGroup
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
                            <Input 
                                type="number" 
                                borderColor="gray.300" 
                                w="84px" 
                                {...register("duration", {
                                    required: "Длительность обязательна",
                                })}
                            />
                            <Text userSelect="none">мин</Text>
                        </Flex>
                        {errors.duration && (
                            <FieldErrorText>{errors.duration.message}</FieldErrorText>
                        )}
                    </Field.Root>

                    <Field.Root orientation="horizontal" invalid={!!errors.description}>
                        <Field.Label minW="220px" fontSize={"16px"}> Описание </Field.Label>
                        <Textarea
                            borderColor="gray.300" 
                            {...register("description", {
                                required: "Описание обязательно",
                                minLength: { value: 10, message: "Минимум 10 символов" },
                                maxLength: { value: 1000, message: "Максимум 1000 символов" }
                            })}
                        />
                        {errors.description && (
                            <FieldErrorText>{errors.description.message}</FieldErrorText>
                        )}
                    </Field.Root>

                    <Field.Root orientation="horizontal" >
                        <FileUpload.Root {...imageField}>
                            <FileUpload.HiddenInput/>
                            <Grid templateColumns="repeat(3, 1fr)">
                                <FileUpload.Label w={"225px"} fontSize={"16px"}>Загрузить фото</FileUpload.Label>     
                                <FileUpload.Trigger asChild>
                                    <Button variant={"subtle"} color={"black"} bg={"gray.200"} w={"173"} h={"48px"} fontSize={"18px"}>
                                        Выбрать файл
                                    </Button>
                                </FileUpload.Trigger>
                                <Box ml={"20px"}>
                                    <FileUpload.ItemGroup>
                                        <FileUpload.Context>
                                            {({ acceptedFiles }) =>
                                                acceptedFiles.map((file) => (
                                                    <FileUpload.Item key={file.name} file={file} bg={"white"} borderWidth={"1px"} borderColor={"#DEE2E6"} h={"48px"}>
                                                        <FileUpload.ItemPreview />
                                                        <FileUpload.ItemName color={"black"} fontSize={"18px"}/>
                                                    </FileUpload.Item>
                                                ))
                                            }
                                        </FileUpload.Context>
                                    </FileUpload.ItemGroup>
                                </Box>
                            </Grid>
                        </FileUpload.Root>
                    </Field.Root>

                    <Flex justify={"center"}>
                        <Button 
                            type="submit" 
                            variant={"solid"} 
                            colorPalette="blue" 
                            w={"145px"} 
                            h={"48px"}
                            disabled={!isFormValid}
                        >
                            Сохранить
                        </Button>
                    </Flex>
                </Flex>           
            </Flex>
        </form>
    );
}
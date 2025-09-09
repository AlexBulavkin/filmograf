import { Grid, Flex, Heading } from "@chakra-ui/react";
import Film from "../components/Film";
import Filters from "../components/Filters";

export default function FilmsCards(){
    return (
        <>
        <Flex justify={"space-between"} my="30px"  mr="60px">
            <Heading color="black" fontSize="40px" fontWeight="bold">Фильмы</Heading>
            <Filters />
        </Flex>
        <Grid templateColumns="repeat(3, 1fr)" gap="10px"> 
            <Film />
            <Film />
            <Film />
            <Film />
            <Film />
            <Film />
            <Film />
            <Film />
            <Film />
        </Grid>
        </>
    )
}
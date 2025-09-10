import { Grid, Flex, Heading } from "@chakra-ui/react";
import Films from "../components/Films";
import Filters from "../components/Filters";

export default function MainPage(){
    return (
        <>
        <Flex justify={"space-between"} my="30px"  mr="30px">
            <Heading color="black" fontSize="40px" fontWeight="bold">Фильмы</Heading>
            <Filters />
        </Flex>
            <Films />
        </>
    )
}
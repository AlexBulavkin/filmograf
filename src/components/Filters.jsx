import { Flex } from "@chakra-ui/react";
import Filter from "./Filter";

export default function Filters(){
    return (
        <Flex gap="15px">
            <Filter />
            <Filter />
            <Filter />
            <Filter />
        </Flex>
    )
}

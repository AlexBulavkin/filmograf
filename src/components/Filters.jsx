import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { useState } from "react";
import genresList from "./genresList";

export default function Filters(){
    const [filters, setFilters] = useState(genresList);
    return (
        <Flex gap={'10px'}>
            {filters.map((filter) => (
                <Flex key={filter.id} align={"center"} gap={'10px'}>
                    <Flex gap={'5px'}>
                    <Icon color={"#EA580B"}>
                        <IoMdCheckmarkCircle />
                    </Icon>
                    <Text color="black" fontSize="16px" fontWeight={"medium"}>{filter.title}</Text>
                    </Flex>
                </Flex>
            ))}
        </Flex>
    )
}

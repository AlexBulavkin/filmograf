import { Flex } from "@chakra-ui/react";
import { Checkbox } from "@chakra-ui/react"
import { useState } from "react";
import genresList from "./genresList";

export default function Filters(){
    const [filters, setFilters] = useState(genresList);
    return (
        <Flex gap={'10px'}>
            {filters.map((filter) => (
                <Flex key={filter.id} align={"center"} gap={'10px'}>
                    <Flex gap={'5px'}>
                        <Checkbox.Root defaultChecked colorPalette={`${filter.color}`}>
                        <Checkbox.HiddenInput />
                        <Checkbox.Control rounded={"full"} >
                            <Checkbox.Indicator />
                        </Checkbox.Control>
                        <Checkbox.Label fontSize={"16px"} fontWeight={"medium"}> {filter.title} </Checkbox.Label>
                        </Checkbox.Root>
                    </Flex>
                </Flex>
            ))}
        </Flex>
    )
}

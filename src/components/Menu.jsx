import { Link } from "react-router";
import { Flex } from "@chakra-ui/react";

export default function Menu(){
    return (
        <Flex color={"black"} fontSize="16px" fontWeight={"medium"} gap="15px" my="30px">
            <Link to="/">Все фильмы</Link>
            <Link to="/saved">Избранное</Link>
            <Link to="/add">Добавить фильм</Link>
        </Flex>
    )
}


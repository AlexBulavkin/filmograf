import { Link } from "react-router";
import { Flex } from "@chakra-ui/react";
// import MenuItem from "./MenuItem";

export default function Menu(){
    return (
        <Flex gap="15px" my="30px" color="black">
            <Link to="/saved">Избранное</Link>
        </Flex>
    )
}

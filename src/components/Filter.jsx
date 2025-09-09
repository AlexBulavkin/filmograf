import { Flex, Icon, Text } from "@chakra-ui/react";
import { IoMdCheckmarkCircle } from "react-icons/io";


export default function Filter(){
    return (
        <Flex align={"center"} gap={'5px'}>
            <Icon color={"#EA580B"}>
                <IoMdCheckmarkCircle />
            </Icon>
            <Text color="black" fontSize="16px" fontWeight={"medium"}>Фильтр</Text>
        </Flex>    
    )
}

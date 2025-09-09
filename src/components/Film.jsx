import { Box, Flex, Icon, Image, Text } from "@chakra-ui/react"
import filmImage from '../assets/matrix.png'
import { FaRegStar } from "react-icons/fa";
import { GoClock } from "react-icons/go";


export default function Film(){
    return (
        <Box borderWidth="1px" borderColor={"#DEE2E6"} rounded={"20px"} h={"350px"} w={"325px"}>
            <Image
                src={filmImage}
                fit={"cover"}
                roundedTop={"20px"}
                alt="Постер"
            />
            <Text color={"black"} fontSize="22px" fontWeight={"semibold"} my={'20px'} mx={'20px'}>Название фильма</Text>
            <Flex justify={'space-between'} align={"center"} my={'20px'} mx={'20px'}>
                <Text color={"black"} fontSize="14px" fontWeight={"medium"}>Жанр</Text>
                <Flex gap="5px">
                    <Icon color={"black"}>
                        <GoClock />
                    </Icon>
                    <Text color={"black"} fontSize="14px" fontWeight={"regular"}>Длительность</Text>                     
                </Flex>
                <Icon color={"#F9A62B"}>
                    <FaRegStar />
                </Icon>
            </Flex>
        </Box>
    )
}

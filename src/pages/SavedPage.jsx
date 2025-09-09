import { Box, Flex, Heading, Image } from "@chakra-ui/react";
import filmImage from '../assets/matrix.png';

export default function SavedPage() {
  return (
    <Box>
      <Heading color="black" fontSize="40px" fontWeight="bold">Избранное</Heading>
      <Flex direction={"column"}>
        <Flex>
          <Image
          src={filmImage}
          fit={"cover"}
          rounded={"full"}
          alt="Постер"
          />
        </Flex>

      </Flex>
    </Box>
    
  );
}

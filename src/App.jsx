import Menu from './components/Menu'
import Footer from './components/Footer'
import { Outlet } from "react-router";
import { Box, Flex, Center } from '@chakra-ui/react'


export default function App() {
  return (
    <Flex direction="column" minHeight="100vh">
      <Box flex="1">
        <Center>
          <Box w="1172px">
            <Menu />
            <Outlet />   
          </Box>
        </Center>
      </Box>
      <Center>
        <Footer />
      </Center>
    </Flex>
  )
}

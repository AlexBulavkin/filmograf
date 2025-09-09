import Menu from './components/Menu'
import Footer from './components/Footer'
import { Outlet } from "react-router";
import { Box, Center } from '@chakra-ui/react'


export default function App() {
  return (
    <>
    <Center bg="white">
      <Box w="1172px">
        <Menu />
        <Outlet />   
      </Box>
    </Center>
    <Center>
      <Footer />
    </Center>
    </>
  )
}

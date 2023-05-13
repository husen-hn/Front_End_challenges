import { HStack, Image, Text } from '@chakra-ui/react'
import logo from '../assets/logo.webp'
import ColorModeSwitch from './ColorModeSwitch'

function NavBar() {
    return (
        <HStack padding="10px">
            <Image src={logo} boxSize="60px" />
            <Text>NavBar</Text>
            <ColorModeSwitch />
        </HStack>
    )
}

export default NavBar

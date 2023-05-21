import { HStack, Image } from '@chakra-ui/react'
import logo from '../assets/logo.webp'
import ColorModeSwitch from './ColorModeSwitch'
import SearhcInput from './SearhcInput'

const NavBar = () => {
    return (
        <HStack padding="10px">
            <Image src={logo} boxSize="60px" />
            <SearhcInput />
            <ColorModeSwitch />
        </HStack>
    )
}

export default NavBar

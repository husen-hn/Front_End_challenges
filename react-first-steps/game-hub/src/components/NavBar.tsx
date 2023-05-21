import { HStack, Image } from '@chakra-ui/react'
import logo from '../assets/logo.webp'
import ColorModeSwitch from './ColorModeSwitch'
import SearhcInput from './SearhcInput'

interface Props {
    onSearch: (searchText: string) => void
}

const NavBar = ({ onSearch }: Props) => {
    return (
        <HStack padding="10px">
            <Image src={logo} boxSize="60px" />
            <SearhcInput onSearch={onSearch} />
            <ColorModeSwitch />
        </HStack>
    )
}

export default NavBar

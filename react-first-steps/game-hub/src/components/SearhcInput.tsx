import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { BsSearch } from 'react-icons/bs'

function SearhcInput() {
    return (
        <InputGroup>
            <InputLeftElement children={<BsSearch />} />
            <Input borderRadius={20} placeholder="Search games..."></Input>
        </InputGroup>
    )
}

export default SearhcInput

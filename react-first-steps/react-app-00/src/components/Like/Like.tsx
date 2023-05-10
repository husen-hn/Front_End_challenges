import { AiFillHeart } from 'react-icons/ai'

interface Props {
    liked: boolean
    onClick: () => void
}

function Like({ liked, onClick }: Props) {
    return (
        <AiFillHeart
            color={liked && '#e91e63'}
            fontSize="3em"
            style={{ cursor: 'pointer' }}
            onClick={onClick}
        />
    )
}

export default Like

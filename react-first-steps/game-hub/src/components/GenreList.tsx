import {
    Button,
    HStack,
    Heading,
    Image,
    List,
    ListItem,
    Spinner
} from '@chakra-ui/react'
import useGenres, { Genre } from '../hooks/useGenres'
import getCroppedImageUrl from '../services/image-url'

interface Props {
    onSelectGenre: (genre: Genre) => void
    seletedGenre: Genre | null
}

function GenreList({ seletedGenre, onSelectGenre }: Props) {
    const { data, loading, error } = useGenres()

    if (error) return null
    if (loading) return <Spinner />

    return (
        <>
            <Heading fontSize="2xl" marginBottom={3}>
                Genres
            </Heading>
            <List>
                {data.map((genre) => (
                    <ListItem key={genre.id} paddingY="5px">
                        <HStack>
                            <Image
                                boxSize="32px"
                                borderRadius={8}
                                objectFit="cover"
                                src={getCroppedImageUrl(genre.image_background)}
                            />
                            <Button
                                whiteSpace="normal"
                                textAlign="left"
                                fontWeight={
                                    genre.id === seletedGenre?.id
                                        ? 'bold'
                                        : 'normal'
                                }
                                onClick={() => onSelectGenre(genre)}
                                fontSize="lg"
                                variant="link"
                            >
                                {genre.name}
                            </Button>
                        </HStack>
                    </ListItem>
                ))}
            </List>
        </>
    )
}

export default GenreList

import { SimpleGrid, Text } from '@chakra-ui/react'
import useGames from '../hooks/useGames'
import GameCard from './GameCard'
import GameCardContainer from './GameCardContainer'
import GameCardSkeleton from './GameCardSkeleton'
import { Genre } from '../hooks/useGenres'

interface Props {
    selectedGenre: Genre | null
}

function GameGrid({ selectedGenre }: Props) {
    const { data, error, loading } = useGames(selectedGenre)
    const skeletons = [1, 2, 3, 4, 5, 6]

    if (error) return <Text>{error}</Text>

    return (
        <SimpleGrid
            columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
            padding="10px"
            spacing={6}
        >
            {loading &&
                skeletons.map((skeleton) => (
                    <GameCardContainer key={skeleton}>
                        <GameCardSkeleton />
                    </GameCardContainer>
                ))}
            {data.map((game) => (
                <GameCardContainer key={game.id}>
                    <GameCard game={game} />
                </GameCardContainer>
            ))}
        </SimpleGrid>
    )
}

export default GameGrid

import { Card, CardBody, Skeleton, SkeletonText } from '@chakra-ui/react'

export default function GameCardSkeleton() {
    return (
        <Card>
            <Skeleton height="200px"></Skeleton>
            <CardBody>
                <SkeletonText />
            </CardBody>
        </Card>
    )
}

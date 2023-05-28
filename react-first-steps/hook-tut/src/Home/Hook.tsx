import { useParams } from 'react-router-dom'
import HooksName from '../data/HooksName'
import NoMatch from '../NoMatch/NoMatch'

function Hook() {
    const { slug } = useParams()

    const hook = HooksName[slug as string].element

    if (!hook) return <NoMatch />

    return hook
}

export default Hook

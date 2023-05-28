import HooksName from '../data/HooksName'
import { Link } from 'react-router-dom'

function HooksList() {
    return (
        <ul className="max-w-md space-y-1 list-disc list-inside">
            {Object.entries(HooksName).map(([slug, { title }]) => (
                <li key={slug} className="flex items-center">
                    <Link to={`/${slug}`}>
                        <h3>{title}</h3>
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default HooksList

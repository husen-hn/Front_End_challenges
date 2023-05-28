import HooksName from '../../data/HooksName'
import { Link } from 'react-router-dom'

function HooksList() {
    return (
        <ul style={{ listStyleType: 'circle' }}>
            {Object.entries(HooksName).map(([slug, { title }]) => (
                <li key={slug}>
                    <Link to={`/blog/${slug}`}>
                        <h3>{title}</h3>
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default HooksList

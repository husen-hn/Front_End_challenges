import { Link } from 'react-router-dom'
import BlogPosts from '../data/BlogPosts'

function PostLists() {
    return (
        <ul>
            {Object.entries(BlogPosts).map(([slug, { title }]) => (
                <li key={slug}>
                    <Link to={`/blog/${slug}`}>
                        <h3>{title}</h3>
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default PostLists

import { useParams } from 'react-router-dom'
import BlogPosts from '../data/BlogPosts'

function Post() {
    const { slug } = useParams()

    const post = BlogPosts[slug as string]

    if (!post) {
        return <span>The blog post you've requested doesn't exist.</span>
    }

    const { title, text } = post

    return (
        <div style={{ padding: 20 }}>
            <h3>{title}</h3>

            <p>{text}</p>
        </div>
    )
}

export default Post

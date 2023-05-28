import { Outlet } from 'react-router-dom'

function Blog() {
    return (
        <div style={{ padding: 20 }}>
            <h2>Blog</h2>
            <Outlet />
        </div>
    )
}

export default Blog

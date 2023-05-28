import { Outlet } from 'react-router-dom'

function Blog() {
    return (
        <div style={{ padding: 20 }}>
            <h2 className="mb-10 text-3xl font-bold">Blog</h2>
            <Outlet />
        </div>
    )
}

export default Blog

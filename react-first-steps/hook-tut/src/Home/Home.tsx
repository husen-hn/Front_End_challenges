import { Outlet } from 'react-router-dom'

function Home() {
    return (
        <div className="p-10">
            <Outlet />
        </div>
    )
}

export default Home

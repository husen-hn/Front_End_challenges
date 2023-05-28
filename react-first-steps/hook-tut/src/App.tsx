import './App.css'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import Routes from './Routes.tsx'

function App() {
    return (
        <Router>
            <nav className="p-10 bg-[#16161C]">
                <Link to="/" style={{ padding: 5 }}>
                    Home
                </Link>
                <Link to="/blog" style={{ padding: 5 }}>
                    Blog
                </Link>
            </nav>

            <Routes />
        </Router>
    )
}

export default App

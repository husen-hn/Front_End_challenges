import './App.css'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import Routes from './Routes.tsx'

function App() {
    return (
        <Router>
            <nav style={{ margin: 10 }}>
                <Link to="/" style={{ padding: 5 }}>
                    Home
                </Link>
                <Link to="/posts" style={{ padding: 5 }}>
                    Posts
                </Link>
            </nav>

            <Routes />
        </Router>
    )
}

export default App

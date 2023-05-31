import { useRoutes } from 'react-router-dom'
import Post from './Blog/Post'
import PostLists from './Blog/PostLists'
import NoMatch from './NoMatch/NoMatch'
import Blog from './Blog/Blog'
import Home from './Home/Home'
import HooksList from './Home/HooksList'
import Hook from './Home/Hook'

function Routes() {
    const element = useRoutes([
        {
            path: '/',
            element: <Home />,
            children: [
                { index: true, element: <HooksList /> },
                { path: ':slug', element: <Hook /> }
            ]
        },
        {
            path: '/blog',
            element: <Blog />,
            children: [
                { index: true, element: <PostLists /> },
                { path: ':slug', element: <Post /> }
            ]
        },
        { path: '*', element: <NoMatch /> }
    ])
    return element
}

export default Routes

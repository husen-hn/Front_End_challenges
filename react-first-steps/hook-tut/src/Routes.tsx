import { useRoutes } from 'react-router-dom'
import Post from './components/Blog/Post'
import PostLists from './components/Blog/PostLists'
import Posts from './components/Blog/Posts'
import NoMatch from './components/NoMatch/NoMatch'
import UseEffectHook from './components/useEffect/UseEffectHook'
import UseStateHook from './components/useState/UseStateHook'

function Routes() {
    const element = useRoutes([
        { path: '/', element: <UseStateHook /> },
        {
            path: '/posts',
            element: <Posts />,
            children: [
                { index: true, element: <PostLists /> },
                { path: ':slug', element: <Post /> }
            ]
        },
        { path: '/useEffectHook', element: <UseEffectHook /> },
        { path: '*', element: <NoMatch /> }
    ])
    return element
}

export default Routes

import { ReactElement } from 'react'
import UseStateHook from '../Hooks/useState/UseStateHook'
import UseEffectHook from '../Hooks/useEffect/UseEffectHook'
import UseFormHook from '../Hooks/useForm/UseFormHook'
import UseContextHook from '../Hooks/useContext/UseContextHook'

const HooksName: { [key: string]: { title: string; element: ReactElement } } = {
    'use-sate': {
        title: 'useState',
        element: <UseStateHook />
    },
    'use-effect': {
        title: 'useEffect',
        element: <UseEffectHook />
    },
    'use-context': {
        title: 'useContext',
        element: <UseContextHook />
    },
    'use-form': {
        title: 'useForm',
        element: <UseFormHook />
    }
}

export default HooksName

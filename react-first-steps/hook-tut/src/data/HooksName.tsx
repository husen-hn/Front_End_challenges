import { ReactElement } from 'react'
import UseStateHook from '../Hooks/useState/UseStateHook'
import UseEffectHook from '../Hooks/useEffect/UseEffectHook'
import UseFormHook from '../Hooks/useForm/UseFormHook'
import UseContextHook from '../Hooks/useContext/UseContextHook'
import UseRefHook from '../Hooks/useRef/UseRefHook'
import UseReducerHook from '../Hooks/useReducer/UseReducerHook'
import UseCallbackHook from '../Hooks/useCallback/UseCallbackHook'
import ErrorBoundaryApp from '../Hooks/error-boundary/ErrorBoundaryApp'
import ErrorBoundary from '../Hooks/error-boundary/ErrorBoundary'

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
    'use-ref': {
        title: 'useRef',
        element: <UseRefHook />
    },
    'use-reducer': {
        title: 'useReducer',
        element: <UseReducerHook />
    },
    'use-callback': {
        title: 'useCallback',
        element: <UseCallbackHook />
    },
    'use-form': {
        title: 'useForm',
        element: <UseFormHook />
    },
    'error-boundary': {
        title: 'ErrorBoundary',
        element: (
            <ErrorBoundary>
                <ErrorBoundaryApp />
            </ErrorBoundary>
        )
    }
}

export default HooksName

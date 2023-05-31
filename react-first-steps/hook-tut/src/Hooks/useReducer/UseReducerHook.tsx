import { useReducer } from 'react'

const initialTodos: Array<{ id: number; title: string; complete: boolean }> = [
    {
        id: 1,
        title: 'Todo 1',
        complete: false
    },
    {
        id: 2,
        title: 'Todo 2',
        complete: false
    }
]

const reducer = (
    state: Array<{ id: number; title: string; complete: boolean }>,
    action: { type: string; id: number }
) => {
    switch (action.type) {
        case 'COMPLETE':
            return state.map((todo) => {
                if (todo.id === action.id) {
                    return { ...todo, complete: !todo.complete }
                } else {
                    return todo
                }
            })
        default:
            return state
    }
}

function UseReducerHook() {
    const [todos, dispatch] = useReducer(reducer, initialTodos)

    const handleComplete = (todo: {
        id: number
        title: string
        complete: boolean
    }) => {
        dispatch({ type: 'COMPLETE', id: todo.id })
    }

    return (
        <>
            {todos.map(
                (todo: { id: number; title: string; complete: boolean }) => (
                    <div key={todo.id}>
                        <label>
                            <input
                                type="checkbox"
                                checked={todo.complete}
                                onChange={() => handleComplete(todo)}
                            />
                            {todo.title}
                        </label>
                    </div>
                )
            )}
        </>
    )
}

export default UseReducerHook

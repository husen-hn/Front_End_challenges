import { useCallback, useState } from 'react'
import Todos from './Todos'

function UseCallbackHook() {
    const [count, setCount] = useState(0)
    const [todos, setTodos] = useState<string[]>([])

    const increment = () => {
        setCount((c) => c + 1)
    }

    const addTodo = useCallback(() => {
        setTodos((t) => [...t, 'New Todo'])
    }, [todos])
    return (
        <>
            <Todos todos={todos} addTodo={addTodo} />
            <hr />
            <div className="text-xl font-bold">
                Count: {count}
                <button
                    type="button"
                    className="p-3 border-double border-2 border-[#09F7A0] rounded-xl m-5"
                    onClick={increment}
                >
                    +
                </button>
            </div>
        </>
    )
}

export default UseCallbackHook

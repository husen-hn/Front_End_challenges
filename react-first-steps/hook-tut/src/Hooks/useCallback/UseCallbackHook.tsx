import { useCallback, useState } from 'react'
import Todos from './Todos'

function UseCallbackHook() {
    console.log('UseCallbackHook child render')
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
            <div className="text-xl font-bold text-[#F09383]">
                Count: {count}
                <button
                    className="p-5 border-double border-2 border-[#09F7A0] rounded-xl m-5 text-[#09F7A0]"
                    onClick={increment}
                >
                    +
                </button>
            </div>
        </>
    )
}

export default UseCallbackHook

import { useMemo, useState } from 'react'

function UseMemoHook() {
    const [count, setCount] = useState<number>(0)
    const [todos, setTodos] = useState<string[]>([])
    const calculation = useMemo(() => expensiveCalculation(count), [count])

    const increment = () => {
        setCount((c) => c + 1)
    }
    const addTodo = () => {
        setTodos((t) => [...t, 'New Todo'])
    }

    return (
        <div>
            <div>
                <h2 className="text-3xl font-bold m-10">My Todos</h2>
                {todos.map((todo, index) => {
                    return (
                        <p
                            className="text-xl text-gray-400 font-semibold ml-10 mb-3"
                            key={index}
                        >
                            {todo}
                        </p>
                    )
                })}
                <button
                    className="shadow bg-[#F09383] hover:bg-[#FAC29A] focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4 m-10 rounded"
                    onClick={addTodo}
                >
                    Add Todo
                </button>
            </div>
            <hr />
            <div className="flex flex-row text-xl font-bold m-10">
                {' '}
                <h2 className="text-gray-400 mx-1">Expensive Calculation</h2>
                <h2 className="text-[#F43E5C]">{calculation}</h2>
            </div>
            <div className="text-xl font-bold text-[#F09383] ml-10">
                Count: {count}
                <button
                    className="p-5 border-double border-2 border-[#09F7A0] rounded-xl m-5 text-[#09F7A0]"
                    onClick={increment}
                >
                    +
                </button>
            </div>
        </div>
    )
}

const expensiveCalculation = (num: number) => {
    console.log('Calculating...')
    for (let i = 0; i < 1000000000; i++) {
        num += 1
    }
    return num
}

export default UseMemoHook

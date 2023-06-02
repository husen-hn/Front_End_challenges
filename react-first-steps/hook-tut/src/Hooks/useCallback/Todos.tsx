import { memo } from 'react'

interface Props {
    todos: string[]
    addTodo: () => void
}

function Todos({ todos, addTodo }: Props) {
    return (
        <>
            <h2 className="text-3xl font-bold m-10 ">My Todos</h2>
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
        </>
    )
}

export default memo(Todos)

import { useState } from 'react'

function UseStateHook() {
    const [count, setCount] = useState(0)
    return (
        <div className="p-20">
            <div className="flex justify-center mb-20">
                <h2 className="text-3xl">{count}</h2>
            </div>

            <div className="flex flex-row justify-center">
                <button
                    type="button"
                    className="p-5 border-double border-2 border-[#09F7A0] rounded-xl m-5"
                    onClick={() => setCount(count + 1)}
                >
                    +
                </button>
                <button
                    type="button"
                    className="p-5 border-double border-2 border-[#F43E5C] rounded-xl m-5"
                    onClick={() => setCount(count - 1)}
                >
                    -
                </button>
            </div>
        </div>
    )
}

export default UseStateHook

import { useEffect, useRef, useState } from 'react'

function UseRefHook() {
    const [inputValue, setInputValue] = useState('')
    const count = useRef(0)

    useEffect(() => {
        count.current += 1
    })

    return (
        <>
            <div className="md:w-2/3">
                <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-[#8931B9]"
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
            </div>
            <h1 className="m-10 text-xl font-bold">
                Render Count: {count.current}
            </h1>
        </>
    )
}

export default UseRefHook

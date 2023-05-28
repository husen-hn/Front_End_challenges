import { useEffect, useState } from 'react'

function UseEffectHook() {
    const [count, setCount] = useState(0)

    useEffect(() => {
        setTimeout(() => {
            setCount((count) => count + 1)
        }, 3000)
    })

    return (
        <div className="p-20 text-xl font-bold">
            I've rendered {count} times!
        </div>
    )
}

export default UseEffectHook

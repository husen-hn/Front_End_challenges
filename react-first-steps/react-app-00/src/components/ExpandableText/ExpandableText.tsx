import { useState } from 'react'

interface Props {
    children: string
    length: number
}

function ExpandableText({ children, length }: Props) {
    const [isExpanded, setIsExpanded] = useState(false)
    const txt: Array<string> = children.split(' ')

    let limitedTxt: Array<string> = txt.slice(0, length)

    if (txt.length <= length) return <p>{children}</p>

    return (
        <>
            <p>{isExpanded ? children : limitedTxt.join(' ') + ' ...'}</p>

            {
                <button
                    onClick={() => {
                        setIsExpanded(!isExpanded)
                    }}
                >
                    {!isExpanded ? 'more' : 'less'}
                </button>
            }
        </>
    )
}

export default ExpandableText

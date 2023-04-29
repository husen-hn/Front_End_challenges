import { useState } from 'react'
import styles from './ListGroup.module.css'

interface Props {
    items: string[]
    heading: string
}

function ListGroup({ items, heading }: Props) {
    const getMessage = () => items.length === 0 && <p>No item found</p>

    const [selectedIndex, setSelectedIndex] = useState(-1)

    return (
        <>
            <h1>{heading}</h1>
            {getMessage()}
            <ul className={[styles.listGroup, styles.container].join(' ')}>
                {items.map((item, index) => (
                    <li
                        key={item}
                        className={
                            selectedIndex === index
                                ? 'list-group-item active'
                                : 'list-group-item '
                        }
                        onClick={() => setSelectedIndex(index)}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </>
    )
}

export default ListGroup

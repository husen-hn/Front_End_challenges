import { useState } from 'react'
import './App.css'
import Alert from './components/Alert'
import BtnType from './components/BtnType'
import Button from './components/Button'
import ListGroup from './components/ListGroup'

function App() {
    const items = ['New York', 'San Francico', 'Tokyo', 'London', 'Paris']

    const [visible, setVisible] = useState(false)

    function onClickHandler() {
        setVisible(!visible)
    }

    return (
        <>
            {visible && (
                <Alert onClose={() => setVisible(false)}>
                    Hello <span>World</span>
                </Alert>
            )}
            <ListGroup items={items} heading="Cities" />
            <Button type={BtnType.DAN} onClick={onClickHandler}>
                Click here
            </Button>
        </>
    )
}

export default App

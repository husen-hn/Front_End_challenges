import 'bootstrap/dist/css/bootstrap.min.css'
import ListGroup from './components/ListGroup'
import Alert from './components/Alert'
import Button from './components/Button'
import BtnType from './BtnType'
import { useState } from 'react'

function App() {
    const items = ['New York', 'San Francisco', 'Tokyo', 'Lonodn', 'Paris']
    const handleSelectItem = (item: string) => {
        console.log(item)
    }

    const [visible, setVisible] = useState(false)
    const handleAlertBtn = () => setVisible(!visible)

    return (
        <div>
            <ListGroup
                items={items}
                heading="Cities"
                onSelectItem={handleSelectItem}
            />
            {visible && (
                <Alert onClose={() => setVisible(false)}>
                    <strong>Holy guacamole!</strong> You should check in on some
                    of those fields below.
                </Alert>
            )}
            <Button
                text={'Button'}
                type={BtnType.PRI}
                onClickBtn={handleAlertBtn}
            />
        </div>
    )
}

export default App

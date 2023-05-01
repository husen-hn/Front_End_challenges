import { useState } from 'react'
import Alert from './components/Alert'
import BtnType from './components/Button/BtnType'
import Button from './components/Button'
import ListGroup from './components/ListGroup'
import Like from './components/Like'
import ExpandableText from './components/ExpandableText'

function App() {
    const items = ['New York', 'San Francico', 'Tokyo', 'London', 'Paris']

    const [visible, setVisible] = useState(false)

    function onClickHandler() {
        setVisible(!visible)
    }

    const [liked, setLiked] = useState(false)

    function onLikeBtnHandler() {
        console.log('Clicked')

        setLiked(!liked)
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
            <Like onClick={onLikeBtnHandler} liked={liked} />
            <br />
            <ExpandableText length={10}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Doloremque, deleniti voluptate ducimus sunt molestias beatae
                minima harum cumque porro quaerat, ad sequi! Sint atque
                recusandae hic? Dolor harum est iste.
            </ExpandableText>
        </>
    )
}

export default App

import { useEffect, useState } from 'react'
import Alert from './components/Alert'
import BtnType from './components/Button/BtnType'
import Button from './components/Button'
import ListGroup from './components/ListGroup'
import Like from './components/Like'
import ExpandableText from './components/ExpandableText'
import Form from './components/Form'
import ExpanceFilter from './expense-tracker/components/ExpanceFilter'
import ExpenceForm from './expense-tracker/components/ExpenceForm'
import ProductList from './components/ProductList'

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

    const [, setSelectedCategory] = useState('')

    const [expenses, setExpenses] = useState([])

    const [category, setCategory] = useState('')
    // after render
    useEffect(() => {})

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
            <hr />
            <hr />
            <div className="m-3">
                <Form />
                <hr />
                <ExpenceForm
                    onSubmit={(data) => setExpenses([...expenses, data])}
                />
                <ExpanceFilter
                    onSelectCategory={(category) =>
                        setSelectedCategory(category)
                    }
                />
                <ExpenseList
                    expenses={expenses}
                    onDelete={(id) =>
                        setExpenses(expenses.filter((e) => e.id !== id))
                    }
                />
            </div>
            <div>
                <select
                    className="form-select"
                    onChange={(event) => {
                        setCategory(event.target.value)
                    }}
                >
                    <option value=""></option>
                    <option value="Clothing">Clothing</option>
                    <option value="Household">Household</option>
                </select>
                <ProductList category={category} />
            </div>
        </>
    )
}

export default App

import Calculator from './Calculator.js'

const primaryOperandDisplay = document.querySelector('[data-primary-operand]')
const secondOperandDisplay = document.querySelector('[data-secondary-operand]')
const operandDisplay = document.querySelector('[data-operation]')

const calculator = new Calculator(
    primaryOperandDisplay,
    secondOperandDisplay,
    operandDisplay
)

document.addEventListener('click', (e) => {
    if (e.target.matches('[data-all-clear]')) {
        calculator.clear()
    }
    if (e.target.matches('[data-number]')) {
        calculator.addDigit(e.target.textContent)
    }
    if (e.target.matches('[data-delete]')) {
        calculator.removeDigit()
    }
    if (e.target.matches('[data-operation]')) {
        calculator.chooseOperation(e.target.textContent)
    }
    if (e.target.matches('[data-equals]')) {
        calculator.evaluate()
    }
})

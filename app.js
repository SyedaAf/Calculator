class Calculator {
    constructor(previousOutputTextElement , currentOutputTextElement ) {
    this.previousOutputTextElement = previousOutputTextElement;
    this.currentOutputTextElement = currentOutputTextElement;
    this.clear();
    }


clear() {
    this.currentOutput = '';
    this.previousOutput = '';
    this.operation = undefined;
}
delete() {
    this.currentOutput = this.currentOutput.toString().slice(0, -1);
}

appendNumber(number) {

    if (number === '.' && this.currentOutput.includes('.')) return
    this.currentOutput = this.currentOutput.toString() + number.toString();
}
chooseOperation(operation) {
    if (this.currentOutput === '') return
    if (this.currentOutput !== ''&& this.previousOutput !== '') {
        this.compute()
    }
    this.operation = operation;
    this.previousOutput = this.currentOutput;
    this.currentOutput = '';
}

compute() {
    let computation 
    const prev = parseFloat(this.previousOutput)
    const current = parseFloat(this.currentOutput)
    if (isNaN(prev) || isNaN(current)) return
    
    
    switch (this.operation) {
        case '+':
            computation = prev + current
            break;
            case '-':
            computation = prev - current
            break;
            case '×':
            computation = prev * current
            break;
            case '÷':
            computation = prev / current
            break;
                        
            default:
            return
    }  
    
    this.currentOutput = computation;
    this.operation = undefined;
    this.previousOutput = '';
}



getDisplayNumber(number){
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    const floatNumber = parseFloat(number)
    let integerDisplay 
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        } 
        if (decimalDigits != null) {
            return `${integerDisplay}. ${decimalDigits}`
        } else {
            return integerDisplay
        }
    }
    
updateDisplay() {
    this.currentOutputTextElement.innerText = this.getDisplayNumber(this.currentOutput)
    if (this.operation != null) {
        this.previousOutputTextElement.innerText = `${this.previousOutput} ${this.operation}`
    } else {
        this.previousOutputTextElement.innerText = ''
    }
    }

}

const numberButtons = document.querySelectorAll(`[data-number]`)
const operatorButtons = document.querySelectorAll('[data-action]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const clearButton = document.querySelector('[data-all-clear]')
const previousOutputTextElement = document.querySelector('[data-previous-output]')
const currentOutputTextElement = document.querySelector('[data-current-output]')
const calculator = new Calculator(previousOutputTextElement, currentOutputTextElement)


numberButtons.forEach(button => {
    button.addEventListener('click', () =>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()

    })
})

operatorButtons.forEach(button => {
    button.addEventListener('click', () =>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()

    })
})

equalsButton.addEventListener('click', () =>{
        calculator.compute()
        calculator.updateDisplay()

    })


clearButton.addEventListener('click', () =>{
    calculator.clear()
    calculator.updateDisplay()

})


deleteButton.addEventListener('click', () =>{
    calculator.delete()
    calculator.updateDisplay()

})

let number1 = '';
let operator = '';
let number2 = '';

const calc = document.querySelector('.calc-result');
const calcHistory = document.querySelector('.calc-history');
const keypad = document.querySelector('.keypad');


keypad.addEventListener('click', (event) => {
    const target = event.target;
    if (Array.from(target.classList).includes('keypad')) {
        return;
    }
    
    processBtn(target);
});

function processBtn(button) {
    const options = ['DEL', 'C', 'CE', '='];
    const key = button.textContent;

    if (options.includes(key)) {
        switch (key) {
            case 'DEL':
                deleteItem();
                return;
            case 'CE':
                clearEntry();
                return;
            case 'C':
                clearAll();
                return;
            case '=':
                processCalculation()
                return;
        }
    }
    else if (!operator && '-+/*'.includes(key)) {
        if (initCalcVars(key, true)) populateScreen(key);
    }
    else if ('0123456789.'.includes(key)) {
        initCalcVars(key);
        populateScreen(key);
    }
}

function populateScreen(item) {
    calc.textContent += item;
}

function clearEntry() {
    calc.textContent = '';
    resetCalcVars(total=true);
}

function clearAll() {
    clearEntry();
    calcHistory.textContent = '';
}

function deleteItem() {
    if (!operator || number2) calc.textContent = calc.textContent.slice(0, -1);
    if (!operator) number1 = number1.slice(0, -1);
    else number2 = number2.slice(0, -1);
}

function populateCalcHistory(calculation) {
    calcHistory.textContent = calculation;
}

function initCalcVars(key, op=false) {
    if (op) {
        operator = key
        return true
    }

    if (!operator) {
        number1 += key;
    }
    else {
        number2 += key;
    }
}

function resetCalcVars(total=false) {
    if (total) number1 = '';
    number2 = '';
    operator = '';
}


function operate(num1, op, num2) {
    switch (op) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
        default:
            return 'ERROR'
    }
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function processCalculation() {
    calcHistory.textContent = calc.textContent;
    const result = operate(+number1, operator, +number2);

    calc.textContent = result;
    number1 = `${result}`;
    resetCalcVars()

}
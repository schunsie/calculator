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

    if (key == 'DEL') deleteItem();
    else if (key == 'C') clearAll();
    else if (key == 'CE') clearEntry();
    else if (key == '=') processCalculation();

    else if ('-+/*'.includes(key)) {
        if (operator) processCalculation();
        initCalcVars(key, true); 
    }
    else if ('0123456789.'.includes(key)) {
        initCalcVars(key);
    }
    else return 'Error';
    populateScreen(number1, operator, number2);
}

function populateScreen(...items) {
    calc.textContent = '';
    items.forEach( (item) => {
        calc.textContent += item;
    });
}

function clearEntry() {
    resetCalcVars();
}

function clearAll() {
    clearEntry();
    calcHistory.textContent = '';
}

function deleteItem() {
    if (!operator) number1 = number1.slice(0, -1);
    else number2 = number2.slice(0, -1);
}

function populateCalcHistory(calculation) {
    calcHistory.textContent = calculation;
}

function initCalcVars(key, op=false) {
    if (op) {
        operator = key
        return;
    }

    if (!operator) {
        number1 += key;
    }
    else {
        number2 += key;
    }
}

function resetCalcVars() {
    number1 = '';
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
    calcHistory.textContent = `${calc.textContent}=`;
    const result = operate(+number1, operator, +number2);

    calc.textContent = result;
    resetCalcVars()
    number1 = `${result}`;
}
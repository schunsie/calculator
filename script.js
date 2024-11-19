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
    const options = ['DEL', 'C', 'CE'];
    const key = button.textContent;

    if (options.includes(key)) {
        switch (key) {
            case 'DEL':
                deleteItem();
                break;
            case 'CE':
                clearEntry();
                break;
            case 'C':
                clearAll();
                break;
        }
    }
    else {
        populateScreen(key);
    }
}

function populateScreen(item) {
    calc.textContent += item;
}

function clearEntry() {
    calc.textContent = '';
}

function clearAll() {
    calc.textContent = '';
    calcHistory.textContent = '';
}

function deleteItem() {
    calc.textContent = calc.textContent.slice(0, -1);
}


let number1;
let operator;
let number2;

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
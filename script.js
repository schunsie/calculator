const calc = document.querySelector('.calc-result');
const keypad = document.querySelector('.keypad');

keypad.addEventListener('click', (event) => {
    const target = event.target;
    if (Array.from(target.classList).includes('keypad')) {
        return;
    }

    populateScreen(target.textContent);
});

function populateScreen(number) {
    calc.textContent += number;
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
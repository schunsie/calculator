let number1 = '';
let operator = '';
let number2 = '';
let error = false;

const calc = document.querySelector('.calc-result');
const calcHistory = document.querySelector('.calc-history');
const keypad = document.querySelector('.keypad');


keypad.addEventListener('click', (event) => {
    const target = event.target;
    if (Array.from(target.classList).includes('keypad')) {
        return;
    }
    
    const key = target.textContent;
    processBtn(key);
});

function processBtn(key) {

    if (key == 'DEL') deleteItem();
    else if (key == 'C') clearAll();
    else if (key == 'CE') resetCalcVars();
    else if (key == '=') processCalculation();

    else if ('-+/*'.includes(key)) {
        if (operator) processCalculation();
        initCalcVars(key, true); 
    }
    else if ('0123456789'.includes(key)) {
        initCalcVars(key);
    }
    else if (key === '.') !checkForDecimal() ? initCalcVars(key) : key = '';
    else error = true;
    
    if (!error) populateScreen(number1, operator, number2);
    else errorHandling();
}

function populateScreen(...items) {
    calc.textContent = '';
    items.forEach( (item) => {
        calc.textContent += item;
    });
}

function clearAll() {
    resetCalcVars();
    calcHistory.textContent = '';
}

function deleteItem() {
    if (!operator) number1 = number1.slice(0, -1);
    else if (!number2) operator = '';
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
            return num2 !== 0 ? divide(num1, num2) : 'error'; 
        default:
            return num1;
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
    let result = operate(+number1, operator, +number2);
    if (result === 'error') error = '0Division';
    else if (isLongFloat(result)) result = roundToFourDecimals(result);

    resetCalcVars()
    if (!error) number1 = `${result}`;
}

function isLongFloat(num) {
    if (num % 1 === 0) return false;
    
    const decimals = num.toString().split('.')[1]
    if (decimals.length > 4) return true; 
}

 function roundToFourDecimals(float_num) {
    return parseFloat(float_num.toFixed(4));
}

function errorHandling() {
    if (error = '0Division') populateScreen('No, thank you');
    else populateScreen('Invalid action');
    error = false;
}

function checkForDecimal() {
    if (number2.includes('.')) return true;
    else if (!operator && number1.includes('.')) return true;
    return false;
}

// keyboard support

document.addEventListener('keydown', (event) => {
    console.log(event.key);
    console.log(typeof(event.key));
    if (validateKeyboardInput(event.key)) processBtn(event.key);
});

function validateKeyboardInput(key) {
    if (!isNaN(key) || '+-/*'.includes(key)) return true;
    return false;
}
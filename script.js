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

let firstNumber;
let secondNumber;
let operator;

function operate(operator, firstNumber, secondNumber) {
    const operations = {
        "+": add,
        "-": subtract,
        "*": multiply,
        "/": divide,
    }

    return operations[operator](firstNumber, secondNumber);
}
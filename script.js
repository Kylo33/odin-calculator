const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operations = {
    "+": add,
    "-": subtract,
    "*": multiply,
    "/": divide,
};

const operate = (operator, a, b) => operations[operator](a, b);

let operator = "+";
let firstNumber = 0;
let secondNumber = 0;
let display = "";
let input = "";

function addNumberToDisplay(stringNumber) {
    if (input === "") display = "";
    input += stringNumber;
    display += stringNumber;
}

function clear() {
    operator = "+";
    firstNumber = 0;
    secondNumber = 0;
    display = "";
    input = "";
}

function selectOperator(operatorString) {
    // If there was another pending operation, complete that one (it gets stored in firstNumber)
    // ex: 1 + 2 + 3 (a four function calculator would solve 1 + 2 when you press the next operator)
    if (input) equals();

    operator = operatorString; // the new operator

    // Store the display as the first number and clean the 'canvas'
    firstNumber = parseInt(display);
    input = "";
}

function equals() {
    if (input) secondNumber = parseInt(input);
    firstNumber = operate(operator, firstNumber, secondNumber);
    display = firstNumber.toString();
    input = "";
}

document.addEventListener("click", e => {
    const cl = e.target.classList;
    if (cl.contains("number")) addNumberToDisplay(e.target.textContent);
    else if (cl.contains("clear")) clear();
    else if (cl.contains("operator")) selectOperator(e.target.textContent)
    else if (cl.contains("equals")) equals();
});
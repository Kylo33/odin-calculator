const DISPLAY_MAX_DIGITS = 12;

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

function updateDOMDisplay() {
    const displayText = display ? display : "0";
    const displayTextNumber = parseFloat(displayText);

    if (isNaN(displayTextNumber)) {
        document.querySelector("#text").textContent = displayText;
        return;
    }

    const inScientificNotation = parseInt(displayTextNumber.toExponential().split("e")[1]) > 11;
    if (inScientificNotation) {
        const splitNotation = displayTextNumber.toExponential().split("e");
        const base = parseFloat(splitNotation[0]);
        const power = parseInt(splitNotation[1]);
        const powerString = "e" + splitNotation[1];

        const newBase = parseFloat(base.toFixed(DISPLAY_MAX_DIGITS - powerString.length - 2));
        document.querySelector("#text").textContent = newBase.toString() + powerString;
    } else {
        const hasDecimal = displayText.includes(".");
        if (!hasDecimal) {
            document.querySelector("#text").textContent = displayTextNumber;
            return;
        }
        const decimalPlacesAllowed = DISPLAY_MAX_DIGITS - Math.floor(displayTextNumber).toString().length - 1;
        document.querySelector("#text").textContent = parseFloat(displayTextNumber.toFixed(decimalPlacesAllowed));
    }
}

function addNumberToDisplay(stringNumber) {
    if (input.length + 1 > DISPLAY_MAX_DIGITS) return;
    input += stringNumber;
    display = input;
    updateDOMDisplay();
}

function clear() {
    operator = "+";
    firstNumber = 0;
    secondNumber = 0;
    display = "";
    input = "";
    updateDOMDisplay();
}

function selectOperator(operatorString) {
    // If there was another pending operation, complete that one (it gets stored in firstNumber)
    // ex: 1 + 2 + 3 (a four function calculator would solve 1 + 2 when you press the next operator)
    if (input) equals();

    operator = operatorString; // the new operator

    // Store the display as the first number and clean the 'canvas'
    firstNumber = display ? parseFloat(display) : 0;
    input = "";
}

function equals() {
    if (input) secondNumber = parseFloat(input);
    if (operator === "/" && secondNumber === 0) {
        clear();
        display = "Bonk! :3";
        updateDOMDisplay();
        return;
    }
    firstNumber = operate(operator, firstNumber, secondNumber);
    display = firstNumber.toString();
    input = "";
    updateDOMDisplay();
}

document.addEventListener("click", e => {
    const cl = e.target.classList;
    if (cl.contains("number")) addNumberToDisplay(e.target.textContent);
    else if (cl.contains("clear")) clear();
    else if (cl.contains("operator")) selectOperator(e.target.textContent)
    else if (cl.contains("equals")) equals();
});
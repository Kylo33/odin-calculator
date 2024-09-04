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
let displayValue = 0;

function operate() {
    const operations = {
        "+": add,
        "-": subtract,
        "*": multiply,
        "/": divide,
    }

    return operations[operator](firstNumber, secondNumber);
}

document.addEventListener("click", event => {
    if (event.target.tagName !== "BUTTON") return;
    const classList = event.target.classList;
    const tagText = event.target.textContent;
    if (classList.contains("number")) {
        displayValue = displayValue * 10 + parseInt(tagText);
        document.querySelector("#text").textContent = displayValue;
    }
})
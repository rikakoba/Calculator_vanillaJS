const expresion = document.getElementById("expresion");
const delete_btn = document.getElementById("delete");
const clear_btn = document.getElementById("clear");
const equals = document.querySelector(".equals");
const numbers = document.querySelectorAll(".number");
const operations = document.querySelectorAll(".operation");

let currentState = "";

clear_btn.addEventListener("click", () => {
    expresion.textContent = "";
    clearDisplay();
});

delete_btn.addEventListener("click", () => {
    currentState = currentState.slice(0, -1);
    expresion.textContent = currentState;
});

numbers.forEach(number => {
    number.addEventListener("click", (e) => {
        number = e.target.textContent;
        addNumber(number);
    });
});

operations.forEach(operation => {
    operation.addEventListener("click", () => {
        let clickedOperation = operation.textContent;

        if(clickedOperation.includes("%")) {
            addPercentage();
        } else {
            addOperation(clickedOperation);
        }
    });
});

equals.addEventListener("click", () => {
    if(expresion.textContent != "") {
        let arr = expresion.textContent.split("");

        if(arr.includes("+") || arr.includes("-") || arr.includes("*") || arr.includes("/")) {
            calculate();
        }
    }
});

function addPercentage() {
    if(!/[+\-*/]/.test(currentState)) {
        currentState += "/100";
        calculate();
    }

    if(currentState.includes("+")) {
        currentState = currentState[0] * 1 + currentState[0] * currentState[2] / 100;
        calculate();
    }

    if(currentState.includes("-")) {
        currentState = currentState[0] * 1 - currentState[0] * currentState[2] / 100;
        calculate();
    }

    if(currentState.includes("*")) {
        currentState = currentState[0] * currentState[2] / 100;
        calculate();
    }

    if(currentState.includes("/")) {
        currentState = currentState[0] / currentState[2] * 100;
        calculate();
    }
}

function addNumber(number) {
    currentState += number;
    updateDisplay();
}

function addOperation(operation) {
    currentState += operation;
    updateDisplay();
}

function clearDisplay() {
    currentState = "";
}

function updateDisplay() {
    expresion.textContent = currentState;
}

function calculate() {
    currentState = eval(currentState).toString();

    if(currentState[4] == 0) {
        currentState = currentState.slice(0, 4);
    }
    updateDisplay();
}
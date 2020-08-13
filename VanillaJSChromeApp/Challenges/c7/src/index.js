// <⚠️ DONT DELETE THIS ⚠️>
//import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>
const NUMBER_CLASS = "number",
  FUNCTION_CLASS = "function",
  FUNCTION_ADD = "+",
  FUNCTION_SUBTRACT = "-",
  FUNCTION_DIVIDE = "/",
  FUNCTION_MULTIPLY = "*",
  FUNCTION_EQUAL = "=",
  FUNCTION_CLEAR = "C",
  NUMBER_CLICK = "number_click",
  NONE = "NONE";

const display = document.querySelector(".display");

let result = 0,
  input = 0,
  //prev_function = FUNCTION_CLEAR,
  prev_state = NUMBER_CLICK,
  prev_operator = NONE;

function printNumber(number) {
  display.innerHTML = number;
}
function numberClicked(number) {
  input = input * 10 + number;
  printNumber(input);
  prev_state = NUMBER_CLICK;
}

function calculration(operator) {
  if (operator === FUNCTION_ADD) result += input;
  else if (operator === FUNCTION_DIVIDE) result /= input;
  else if (operator === FUNCTION_MULTIPLY) result *= input;
  else if (operator === FUNCTION_SUBTRACT) result -= input;
  else if (operator === NONE) result = input;
}

function functionClicked(name) {
  if (name === FUNCTION_CLEAR) {
    result = 0;
    input = 0;
    //prev_function = FUNCTION_CLEAR;
    prev_state = NUMBER_CLICK;
    prev_operator = NONE;
  } else if (name === FUNCTION_EQUAL) {
    calculration(prev_operator);
  } else {
    if (prev_state === NUMBER_CLICK || prev_state === FUNCTION_CLEAR) {
      calculration(prev_operator);
    }
    prev_operator = name;
  }
  prev_state = name;
  printNumber(result);
}

function handleButtonClick(event) {
  const target = event.target;

  if (target.className === NUMBER_CLASS) {
    if (prev_state === FUNCTION_EQUAL) functionClicked(FUNCTION_CLEAR);
    else if (prev_state !== NUMBER_CLICK) {
      input = 0;
    }

    const number = parseInt(target.value, 10);
    numberClicked(number);
  } else if (target.className === FUNCTION_CLASS) {
    functionClicked(target.value);
  }
}

function init() {
  //console.log("init");
  const buttons = document.querySelectorAll("input");
  buttons.forEach((element) =>
    element.addEventListener("click", handleButtonClick)
  );
}
init();

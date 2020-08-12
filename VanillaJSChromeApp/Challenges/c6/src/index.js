// <⚠️ DONT DELETE THIS ⚠️>
//import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>

const rangeForm = document.querySelector(".range"),
  rangeInput = rangeForm.querySelector("input"),
  limitSpan = document.querySelector(".limitSpan"),
  tryForm = document.querySelector(".try"),
  numberInput = document.querySelector(".numberInput"),
  description = document.querySelector(".description"),
  result = document.querySelector(".result");

let limitNumber = 200;

function handleRangeInput(event) {
  event.preventDefault();
  const val = rangeInput.value;
  limitSpan.innerHTML = val;
  limitNumber = parseInt(val, 10);
}

function handleSubmit(event) {
  event.preventDefault();
  const input = numberInput.value;

  if (input !== "") {
    const inputNumber = parseInt(input, 10);
    const randomNumber = Math.floor(Math.random() * (limitNumber + 1));

    const str1 = `You chose: ${inputNumber}, the machine chose: ${randomNumber}`,
      str2 = inputNumber === randomNumber ? "You Won!" : "You lost";
    description.innerHTML = str1;
    result.innerHTML = str2;
  }
}

function init() {
  rangeInput.min = 0;
  rangeInput.max = limitNumber;
  rangeInput.value = rangeInput.max;
  rangeInput.addEventListener("input", handleRangeInput);

  tryForm.addEventListener("submit", handleSubmit);
}

init();

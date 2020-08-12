// <⚠️ DONT DELETE THIS ⚠️>
//import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>

const PENDING_DATA_KEY = "pendingData",
  FINISHED_DATA_KEY = "finishedData",
  CREATED_NUMBER_KEY = "createdNumber",
  CHECK_CHARACTOR = "✅",
  CROSS_CHARACTOR = "❌",
  REWIND_CHARACTOR = "⏪",
  form = document.querySelector("form"),
  input = document.querySelector("input"),
  pendingUl = document.querySelector(".pendingUl"),
  finishedUl = document.querySelector(".finishedUl");

let pendingData = [],
  finishedData = [],
  createdNumber = 0;

function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function loadData() {
  const pendingItem = localStorage.getItem(PENDING_DATA_KEY),
    finishedItem = localStorage.getItem(FINISHED_DATA_KEY),
    createdNumberItem = localStorage.getItem(CREATED_NUMBER_KEY);

  if (pendingItem !== null) pendingData = JSON.parse(pendingItem);
  if (finishedItem !== null) finishedData = JSON.parse(finishedItem);
  if (createdNumberItem !== null) createdNumber = JSON.parse(createdNumberItem);

  pendingData.forEach((element) => addLiToPendingUl(element.task, element.id));
  finishedData.forEach((element) =>
    addLiToFinishedUl(element.task, element.id)
  );
}

function createLi(task, firstButtonChar, secondButtonChar) {
  const newLi = document.createElement("li"),
    span = document.createElement("span"),
    firstButton = document.createElement("button"),
    secondButton = document.createElement("button");

  span.innerText = task;
  firstButton.innerText = firstButtonChar;
  secondButton.innerText = secondButtonChar;

  newLi.append(span);
  newLi.append(firstButton);
  newLi.append(secondButton);

  return newLi;
}

function addLiToPendingUl(task, id) {
  const newLi = createLi(task, CROSS_CHARACTOR, CHECK_CHARACTOR);

  newLi.id = id;
  const buttons = newLi.querySelectorAll("button");
  buttons[0].addEventListener("click", handlePendingUlRemove);
  buttons[1].addEventListener("click", handlePendingUlCheck);

  pendingUl.append(newLi);
}

function addLiToFinishedUl(task, id) {
  const newLi = createLi(task, CROSS_CHARACTOR, REWIND_CHARACTOR);

  newLi.id = id;
  const buttons = newLi.querySelectorAll("button");
  buttons[0].addEventListener("click", handleFinishedUlRemove);
  buttons[1].addEventListener("click", handleFinishedUlRewind);

  finishedUl.append(newLi);
}

function getFilterdData(data, li) {
  const filtered = data.filter(function (element) {
    return parseInt(li.id) !== parseInt(element.id);
  });
  return filtered;
}
function removeLiFromPendingUl(li) {
  pendingUl.removeChild(li);
  pendingData = getFilterdData(pendingData, li);
  saveData(PENDING_DATA_KEY, pendingData);
}
function removeLiFromFinishedUl(li) {
  finishedUl.removeChild(li);
  finishedData = getFilterdData(finishedData, li);
  saveData(FINISHED_DATA_KEY, finishedData);
}

function handleSubmit(event) {
  event.preventDefault();

  const newTask = input.value;
  input.value = "";

  const newLi = createLi(newTask, CROSS_CHARACTOR, CHECK_CHARACTOR);
  newLi.id = createdNumber;
  const buttons = newLi.querySelectorAll("button");
  buttons[0].addEventListener("click", handlePendingUlRemove);
  buttons[1].addEventListener("click", handlePendingUlCheck);
  const info = { task: newTask, id: createdNumber };

  console.log("handleSubmit:", newLi.id);

  pendingUl.append(newLi);
  pendingData.push(info);
  createdNumber += 1;

  saveData(PENDING_DATA_KEY, pendingData);
  saveData(CREATED_NUMBER_KEY, createdNumber);
}

function getInfoById(data, id) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].id == id) return data[i];
  }
}

function handlePendingUlRemove(event) {
  const pressedButton = event.target;
  const targetLi = pressedButton.parentNode;
  console.log("handlePendingUlRemove:", targetLi.innerText, "/", targetLi.id);
  removeLiFromPendingUl(targetLi);
}

function handlePendingUlCheck(event) {
  const pressedButton = event.target;
  const targetLi = pressedButton.parentNode;

  const info = getInfoById(pendingData, targetLi.id);
  removeLiFromPendingUl(targetLi);
  addLiToFinishedUl(info.task, info.id);

  finishedData.push(info);
  saveData(FINISHED_DATA_KEY, finishedData);
}

function handleFinishedUlRemove(event) {
  const pressedButton = event.target;
  const targetLi = pressedButton.parentNode;
  removeLiFromFinishedUl(targetLi);
}

function handleFinishedUlRewind(event) {
  const pressedButton = event.target;
  const targetLi = pressedButton.parentNode;

  const info = getInfoById(finishedData, targetLi.id);
  removeLiFromFinishedUl(targetLi);
  addLiToPendingUl(info.task, info.id);

  pendingData.push(info);
  saveData(PENDING_DATA_KEY, pendingData);
}

function init() {
  loadData();
  form.addEventListener("submit", handleSubmit);
}

init();

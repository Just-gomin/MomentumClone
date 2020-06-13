const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

// 사용자의 이름을 localStorage에 저장하는 함수
function saveName(text) {
  localStorage.setItem(USER_LS, text); // currentUser라는 키의 값으로 입력된 이름을 저장
}

// 이름의 입력을 처리하는 함수
function handleSubmit(event) {
  event.preventDefault(); // form태그의 제출시 화면이 새로 고침되는 동작을 막는다.
  const currentValue = input.value; // 입력한 이름을 가져온다.
  paintGreeting(currentValue); // 해당 이름을 화면에 출력
  saveName(currentValue); // 이름을 LocalStorage에 저장
}

// 사용자의 현재 이름이 localStorage에 저장되어 있지 않을시 동작할 함수
function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}

// 사용자의 현재 이름이 localStorage에 저장되어 있을 시 동작할 함수
function paintGreeting(text) {
  form.classList.remove(SHOWING_CN); // 사용자의 이름 입력 Input을 안보이게 한다.
  greeting.classList.add(SHOWING_CN); // 입력받은 입력을 보이게 한다.
  greeting.innerText = `I hope your day is beautiful, ${text}!`; // 사용자의 이름 및 지정 문장으로 텍스트 설정
}

// localStorage에서 currentName이라는 키에 대한 값을 가져오는 함수
function loadName() {
  const currentUser = localStorage.getItem(USER_LS); // LocalStorage에서 키 currentUser의 값을 가져온다.
  if (currentUser === null) {
    askForName(); // LocalStorage에 이름이 없으면 askForName을 호출
  } else {
    paintGreeting(currentUser); // LocalStorage에 이름이 있으면 화면에 출력하도록 paintGreeting을 호출
  }
}

function init() {
  loadName(); // loadName호출
}

init();

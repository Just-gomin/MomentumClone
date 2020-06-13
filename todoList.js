const toDoForm = document.querySelector(".js-toDoListForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDoList"; // ToDoList의 이름

let toDos = []; // 할일에 관한 정보를 담고 있는 array(fakeDB)

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); // toDoList라는 키로 fakeDB에 있는 것들을 저장
}

function deleteToDo(event) {
  const btn = event.target; // 해당 삭제버튼을 가져온다.
  const li = btn.parentNode; // 삭제 버튼이 포함된 li를 가져온다.
  toDoList.removeChild(li); // 가져온 li를 toDoList에서 삭제한다.(화면에서 보이지 않게 함)
  // filter 함수는 true를 반환하는 원소에 한해서만 새로운 array를 만든다.
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos; // 완료된 할일을 지운 array를 fakeDB에 값으로 지정한다.
  saveToDos(); // saveToDos호출
}

function paintToDoList(text) {
  const li = document.createElement("li"); // li 태그 생성
  const deleteBtn = document.createElement("button"); // 삭제 버튼 생성
  const span = document.createElement("span"); // span 생성
  const newId = toDos.length + 1; // li의 아이디를 현재 List의 길이 + 1로 설정

  deleteBtn.innerText = "✔";
  deleteBtn.addEventListener("click", deleteToDo);

  span.innerText = text;

  li.appendChild(deleteBtn); // li에 삭제버튼을 넣는다.
  li.appendChild(span); // li에 입력된 todo를 넣는다.
  li.id = newId; // li의 id지정

  toDoList.appendChild(li); // toDoList에 li를 추가한다.

  const toDoObj = {
    text: text,
    id: newId,
  }; // 새로운 toDo의 정보를 객체로 생성
  toDos.push(toDoObj); // fakeDB인 todos에 새로운 할일을 추가

  saveToDos(); // saveToDos 호출
}

function handleSubmit(event) {
  event.preventDefault();

  const currentValue = toDoInput.value;
  paintToDoList(currentValue);

  toDoInput.value = "";
}

function loadToDoList() {
  const toDoList = localStorage.getItem(TODOS_LS); // LocalStorage에서 키 toDoList의 값을 가져온다.
  if (toDoList !== null) {
    const parsedToDos = JSON.parse(toDoList); // LocalStorage에 toDoList의 값이 있는 경우 이를 JavaScript 객체로 변환한다.
    parsedToDos.forEach(function (toDo) {
      paintToDoList(toDo.text); // 각각의 toDo마다 화면에 출력한다.
    });
  }
}

function init() {
  loadToDoList(); // 저장된 toDoList를 불러온다.
  toDoForm.addEventListener("submit", handleSubmit); // toDo 제출시 동작할 함수 지정
}
init();

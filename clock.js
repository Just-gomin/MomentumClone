const clockContainer = document.querySelector(".js-clock"),
  clockTitle = clockContainer.querySelector("h2");
clockContent = clockContainer.querySelector("h1");

function getTime() {
  const date = new Date(); // Date객체 생성
  const year = date.getFullYear(); // 연도
  const month = date.getMonth() + 1; // 달
  const day = date.getDate(); // 날짜
  const minutes = date.getMinutes(); // 분
  const hours = date.getHours(); // 시
  const seconds = date.getSeconds(); // 초

  clockTitle.innerText = `${year}/${month < 10 ? `0${month}` : month}/${
    day < 10 ? `0${day}` : day
  }`; // 연월일을 텍스트로 지정
  clockContent.innerText = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`; // 시분초를 텍스트로 지정
}

function init() {
  getTime(); // 처음 화면을 켰을 때 현재 시간을 보여주는 함수
  setInterval(getTime, 1000); // 1초마다 getTime 함수가 반복되도록 설정
}

init();

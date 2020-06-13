const body = document.querySelector("body");

const imgNumber = 5;

function paintIMG(imgNumber) {
  const image = new Image(); // Image Element 생성
  image.src = `images/${imgNumber + 1}.jpg`; // Image의 source 지정
  image.classList.add("backgroundIMG"); // Image에 CSS 적용을 위해 클래스 명 추가
  body.appendChild(image); // Body태그 아래에 생성한 Image 추가
}

function generateRandomNumber() {
  const number = Math.floor(Math.random() * imgNumber); // 0~1까지의 숫자를 발생시켜 이미지의 총량으로 곱 = 총량 중 한개의 이미지 선택
  return number;
}

function init() {
  const randomNumber = generateRandomNumber(); // 랜덤 숫자를 발생
  paintIMG(randomNumber); // 발생한 숫자에 따라 Page의 뒷배경 설정
}
init();

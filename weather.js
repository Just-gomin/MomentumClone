const weather = document.querySelector(".js-weather");

const WEATHER_API_KEY = "f9ccc5edcaf667332c5d80ffb4120643";
const COORDS = "coords";

// API키와 좌표 값들을 API서버로 보냅니다. 응답을 JS객채로 가져와 그 중 온도와 장소명을 추출하여 화면에 띄웁니다.
function getWeather(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temperature = json.main.temp;
      const place = json.name;
      weather.innerText = `${temperature}℃ / ${place}`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj)); // 키 coords의 값으로 좌표값의 객체를 localStorage에 저장합니다.
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude; // 좌표정보를 가져와 저장합니다.
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  }; // 가져온 좌표를 객체로 만듭니다.
  saveCoords(coordsObj); // 해당 좌표값을 저장하기 위해 saveCoords를 호출합니다.
  getWeather(latitude, longitude); // 날씨 정보를 가져옵니다.
}

function handleGeoError() {
  console.log(`Can't access your geo location.`); // 좌표를 가져오는데 에러 발생시 해당 log를 띄웁니다.
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError); // navigator객체를 이용해 사용자의 위치 정보를 가져옵니다.
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS); // localStorage에 키 coords의 값을 가져온다.
  if (loadedCoords === null) {
    askForCoords(); // 좌표가 없으면 askForCoords를 호출
  } else {
    const parsedCoords = JSON.parse(loadedCoords); // 좌표가 있으면 JS객체로 변환
    getWeather(parsedCoords.latitude, parsedCoords.longitude); // getWeather에 가져온 좌표들을 인자로 넣어준다.
  }
}

function init() {
  loadCoords(); // loadCoords 호출
}
init();

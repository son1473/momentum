//현재 위치 값을 가져와 날씨 api를 적용.
const weather = document.querySelector(".js-weather");

const API_KEYS = "88ca25e50dcfb873bbea85ac90d2fd2a";
const COORDS = 'coords';
//자바스크립트는 refresh 하지 않아도 자동으로 데이터를 가져올 수 있다.
function getWeather(lat, lon){
	fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEYS}&units=metric`
		).then(function(response) {
			return response.json();
		}).then(function(json) {
			const temperature = json.main.temp;
			const place = json.name;
			weather.innerText = `${place} - ${temperature}℃`;
		}); //fetch 먼저 하고 함수 실행 하기위해 then 사용함.

	// units=metric 온도 섭씨로 바꾸기.
}


function saveCoords(coordsObj){
	localStorage.setItem(COORDS, JSON.stringify(coordsObj));
	// 키 값은 coords로, value 값은 객체를 문자열화 해서 저장한다.
}

function handleGeoSucces(position){
	const latitude = position.coords.latitude; // 1 위도
	const longitude = position.coords.longitude; // 2 경도
	const coordsObj = {
		latitude: latitude, // 전 은 key 후는 value, 1이 값으로,
		longitude: longitude // 2가 값으로.
	};
	saveCoords(coordsObj);
	getWeather(latitude, longitude);
}

function handleGeoError(){
	console.log("Can't acess geo location");
}

function askForCoords(){
	navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
	console.log('a');
}

function loadCoords(){
	const loadedCoords = localStorage.getItem(COORDS);
	if(loadedCoords === null){
		askForCoords();
	} else {
		const parseCoords = JSON.parse(loadedCoords);
		getWeather(parseCoords.latitude, parseCoords.longitude);
	}
}



function init(){
	loadCoords();
};

init();

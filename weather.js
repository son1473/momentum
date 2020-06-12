//현재 위치 값을 가져와 보았다.
const API_KEYS = "88ca25e50dcfb873bbea85ac90d2fd2a";
const COORDS = 'coords';

function getWeather(lat, lon){
	fetch(`api.openweathermap.rg/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEYS}&// units=metric 온도 섭씨로 바꾸기.`)
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

//배경사진을 적용해보았다.

const body = document.querySelector("body");

const IMG_NUMBER = 6;


function paintImage(imageNumber){
	const image = new Image();
	// 이건 위와 같다. const images = document.createElement("img");
	image.src = `images/${imageNumber + 1}.jpg`;
	image.classList.add("bgImage");
	body.appendChild(image);
}

function genRandom(){ //generateRandomNumber 랜덤 숫자 생성
	const number = Math.floor(Math.random()*IMG_NUMBER);
	return number; //숫자 반환한다.
	
};

function init(){
	const randomNumber = genRandom();
	paintImage(randomNumber); //반환한 숫자를 paintImage에 넣고 body에 이미지를 추가한다.
};

init();

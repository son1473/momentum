//맞이하는 form을 만들어 보았다.

const form = document.querySelector('.js-form'),
    input = form.querySelector('input'), // 입력받는 form 선택
    greeting = document.querySelector(".js-greetings") //h4 태그 선택

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

function saveName(text){
  localStorage.setItem(USER_LS, text);
}



function handleSubmit(event){
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName(){
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit)
}


function paintGreeting(text){
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN); //h4 태그에 뭘 추가?
  greeting.innerText = `Have a best day ${text}!`; //h4에 입력 합니다. hello text
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS); //로컬스테이지에서 가져옵니다. USER_LS
  if (currentUser === null){ //값이 없으면
    askForName();
  } else {
    paintGreeting(currentUser); //값이 있으면 
  }
}

function init(){
  loadName();
}

init();

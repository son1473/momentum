//할 일 저장하는 리스트를 만들어보았다.

const toDoForm = document.querySelector('.js-toDoForm'), //form
  toDoInput = toDoForm.querySelector('input'), //input
  todoList = document.querySelector('.js-toDoList'); //ul

const TODO_LS = 'toDos';

let toDos = [];

function deleteToDo(event){
  const btn = event.target;
  const li = btn.parentNode;
  todoList.removeChild(li);
  const cleanToDos = toDos.filter(function(toDo){ //각각 실행한다인거 같은데,
    return toDo.id !== parseInt(li.id);//li.id가 string이어서 숫자로 바꾸고 같지 않은 것들끼리 array를 만들겠다. 그게 filter
  });
  console.log(cleanToDos); //만든 array 출력
  toDos = cleanToDos;
  saveTodos();
}

function saveTodos(){
  localStorage.setItem(TODO_LS, JSON.stringify(toDos));
}

function paintTodo(text){ //텍스트 받아서 리스트 넣기 함수.
  const li = document.createElement("li"); //투두 리스트
  const delBtn = document.createElement("button"); //삭제 버튼
  const span = document.createElement("span");
  const newId = toDos.length + 1
//퀘리 셀렉터는 html에 있는 값을 가져 오는 거지만 이번 거는 만드는 것이다.
  delBtn.innerHTML = "❌";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId;
  todoList.appendChild(li); //리스트넣기

  const toDoObj = { //객체 
    text:text, //매개변수 text 넣고
    id:newId // 아이디 넣고
  };
  toDos.push(toDoObj); //그 객체를 배열엔 넣는다.
  saveTodos(); //배열에 있는 것 로컬스토리지에 저장.
}

function handleSubmit(event){
  event.preventDefault();
  const currentValue = toDoInput.value; //입력한 값을 커렌트벨류로 잡는다.
  paintTodo(currentValue); //커렌트 벨류로 페인트투두 실행
  toDoInput.value=""; //실행후 입력 값은 초기화
}

function loadToDo(){
  const loadedToDos = localStorage.getItem(TODO_LS); //로컬스토리지에서 toDos의 값을 가져온다.
  if (loadedToDos !== null) { //값이 항상 있을 것
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function(toDo){ //오브젝트인가 toDo는
      paintTodo(toDo.text);
    });
  }
}

function init(){
  loadToDo();
  toDoForm.addEventListener("submit", handleSubmit); //제출 시
}

init();

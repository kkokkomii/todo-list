//유저가 값을 입력한다
//밑에 리스트에 입력된 값이 출력된다
//리스트의 체크 버튼을 누르면 입력된 할일에 가로선이 그어진다
//리스트의 delete를 누르면 입력된 할일 리스트에서 해당 할일을 삭제한다
//진행중 탭을 누르면 현재 체크가 되지 않은 할일만 선택되어 보여진다
//완료 탭을 누르면 현제 체크가 된 할일한 선택되어 보여진다


let todo_list = [];
let TodoButton = document.getElementById("todo");
let AddButton = document.getElementById("add");
let tabs = document.querySelectorAll(".task_tabs div");
let underline = document.getElementById("under_line");
let mode = "all"
let filteredList = []


console.log(underline)
//탭을 누르면 탭에 맞는 todo를 모아서 보여줌
for(let i=1; i< tabs.length;i++){
  tabs[i].addEventListener("click", function(event){filter(event)});
}


// 엔터키로 Go 버튼 작동시키기
TodoButton.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    list_plus(event);
  }

});


// AddButton을 누르면, todo list에 Todo를 추가함
AddButton.addEventListener("click", list_plus);

function list_plus(){
  let todo = {
    id : randomIDGenerate(),
    todo_input : TodoButton.value,
    isComplete : false
  }
  if (TodoButton.value === "" || TodoButton.value === "") {
    alert("todo 내용을 입력해주세요!"); 
    return;
  }

  todo_list.push(todo);
  TodoButton.value = "";

  render();

}

// render함수로, Todolist에 있는 todo들을 뿌려줌. 여기서 check, undo, delete 버튼을 만들어줌
function render(){
  let resultHTML = ''
  let list = []
  if(mode === "all"){
    list = todo_list
  }else{
    list = filteredList
  }

  for(let i=0;i<list.length;i++){
    if(list[i].isComplete == true){

      resultHTML += `<div class = "task_list" style='background-color: #f3f0f0'>
                <div class="task_done">${list[i].todo_input}  </div>
                  
                  <div> 
                    <button onclick="togglecomplete('${list[i].id}')" class="btn-hover color-9">
                    undo</button>
                    <button onclick="deleteTask('${list[i].id}')" class="btn-hover color-10">
                    delete</button>
                  </div>
                </div>
              </div>`
      // let checkButton = document.getElementById("btn-hover color-9")

    }else {
      resultHTML += `<div class = "task_list">
                  <div>${list[i].todo_input}  </div>
                    
                    <div> 
                    <button onclick="togglecomplete('${list[i].id}')" class="btn-hover color-9">
                    Check</button>
                    
                    <button onclick="deleteTask('${list[i].id}')" class="btn-hover color-10">
                    delete</button>
                    
                    </div>
                  </div>
                </div>`
    }
  }
  document.getElementById("task-board").innerHTML= resultHTML;
}

function togglecomplete(id){
  for(let i=0; i<todo_list.length;i++){
    if(todo_list[i].id == id){
      todo_list[i].isComplete = !todo_list[i].isComplete; // 이게 check 눌렀을 때, 안눌렀을 때를 나눔
      break;
    }
  }
  filter()
}

function deleteTask(id){
  for(let i=0; i<todo_list.length;i++){
    if(todo_list[i].id == id){
      todo_list.splice(i,1);
    }
  }
  filter()
}


function filter(event){
  if (event) {
    mode = event.target.id 
    underline.style.width = event.target.offsetWidth + "px";
    underline.style.left = event.target.offsetLeft + "px"; 
    underline.style.top =
    event.target.offsetTop + (event.target.offsetHeight - 4) + "px";
  }
  filteredList = []
  if(mode == "ongoing"){
    //진행중 아이템 보여줌
    //isComplete == false
    for(let i=0; i<todo_list.length;i++){
      if(todo_list[i].isComplete == false){
        filteredList.push(todo_list[i])
      }
    }
  }else if(mode =="done"){
    //isComplete == true
    for(let i=0; i<todo_list.length;i++){
      if(todo_list[i].isComplete == true){
        filteredList.push(todo_list[i])
      }
    }
  }
  render()
}


tabs.forEach((menu) =>  menu.addEventListener("click", (e) => slide_indicator(e)));

// function slide_indicator(e){
//   resultHTML += `<div id="under_line"></div>`
//   document.getElementById("task-board").innerHTML= resultHTML;

// }

function randomIDGenerate(){
  return '_' + Math.random().toString(36).substr(2,9);
}

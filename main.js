//유저가 값을 입력한다
//밑에 리스트에 입력된 값이 출력된다
//리스트의 체크 버튼을 누르면 입력된 할일에 가로선이 그어진다
//리스트의 delete를 누르면 입력된 할일 리스트에서 해당 할일을 삭제한다
//진행중 탭을 누르면 현재 체크가 되지 않은 할일만 선택되어 보여진다
//완료 탭을 누르면 현제 체크가 된 할일한 선택되어 보여진다


// let todo = document.getElementsByClassName("input_area")
let todo_list = [];

let TodoButton = document.getElementById("todo");
let AddButton = document.getElementById("add");
let tabs = document.querySelectorAll(".task_tabs div");
console.log(tabs);

for(let i=1; i< tabs.length;i++){
  tabs[i].addEventListener("click", function(event){filter(event)});
}
AddButton.addEventListener("click", list_plus);

function list_plus(){
  let todo = {
    id : randomIDGenerate(),
    todo_input : TodoButton.value,
    isComplete : false
  }
  todo_list.push(todo);
  // const listItem = document.createElement("li");
  // listItem.textContent = todo_input;

  // list.appendChild(listItem);
  // inputField.value = "";
  console.log(todo_list);
  render(todo_list);

}

function render(filteredList){
  let resultHTML = ''
  for(let i=0;i<filteredList.length;i++){
    if(filteredList[i].isComplete == true){
      resultHTML += `<div class = "task_list">
                <div class="task_done">${filteredList[i].todo_input}  </div>
                  
                  <div> 
                    <button onclick="togglecomplete('${filteredList[i].id}')" class="btn-hover color-9">
                    Check</button>
                    <button onclick="deleteTask('${filteredList[i].id}')" class="btn-hover color-10">
                    delete</button>
                  </div>
                </div>
              </div>`
    }else {
      resultHTML += `<div class = "task_list">
                  <div>${filteredList[i].todo_input}  </div>
                    
                    <div> 
                    <button onclick="togglecomplete('${filteredList[i].id}')" class="btn-hover color-9">
                    Check</button>
                    
                    <button onclick="deleteTask('${filteredList[i].id}')" class="btn-hover color-10">
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
      todo_list[i].isComplete = !todo_list[i].isComplete;
      break;
    }
  }
  render(todo_list)
}

function deleteTask(id){
  for(let i=0; i<todo_list.length;i++){
    if(todo_list[i].id == id){
      todo_list.splice(i,1);
      break;
    }
  }
  render(todo_list)
}


function filter(event){
  let mode = event.target.id 
  let filteredList = []
  if( mode == "all"){
    //전체 리스트
 
    render(todo_list)
  }else if(mode == "ongoing"){
    //진행중 아이템 보여줌
    //isComplete == false
    for(let i=0; i<todo_list.length;i++){
      if(todo_list[i].isComplete == false){
        filteredList.push(todo_list[i])
      }
    }
    render(filteredList)

  }else if(mode =="done"){
    //isComplete == false
    for(let i=0; i<todo_list.length;i++){
      if(todo_list[i].isComplete == true){
        filteredList.push(todo_list[i])
      }
    }
    render(filteredList)
  }
}


function slide(event){
  resultHTML += `<div id="under_line"></div>`
  document.getElementById("task-board").innerHTML= resultHTML;
}

function randomIDGenerate(){
  return '_' + Math.random().toString(36).substr(2,9);
}

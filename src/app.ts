import { TodoTemplate } from "./classes/TodoTemplate.js";
import { Todos } from "./classes/Todos.js";
import { TodoItem } from "./interfaces/TodoItem.js";
import { Store } from "./classes/Store.js";
import { DateValidCheck } from "./interfaces/TodoItem.js";

const form = document.querySelector(".todo-form") as HTMLFormElement;
const category = document.querySelector("#category") as HTMLSelectElement;
const title = document.querySelector("#title") as HTMLInputElement;
const duedate = document.querySelector("#duedate") as HTMLInputElement;

const todoTemp = new TodoTemplate();
const todos = new Todos();


todoTemp.render();

form.addEventListener("submit", (e: Event) => {
  // e.preventDefault();

  let n_id: number = 0; // todo id값

  let newTodoItem = new TodoItem(
      n_id.toString(),
      category.value,
      title.value,
      parseInt(duedate.value),
      false
  );
  
  const validCheck: DateValidCheck = newTodoItem.checkDate(duedate.value);
  
  // DateValidCheck => 0: pass(true) 1:invalid date(false) 2:past date(false)
  if(validCheck === 0 ){
    const todoList:TodoItem[] = Store.getTodoItems();
    
    if (todoList.length > 0) {
      n_id = parseInt(todoList[todoList.length - 1].todoId) + 1;
      newTodoItem.todoId = n_id.toString();
    }

    todos.addTodoItem(newTodoItem);

    // 폼 초기화
    title.value = "";
    duedate.value = "";
  } 
  else if(validCheck === 1) {
    alert("날짜를 올바르게 입력하세요");
    duedate.value = "";
  }
  else if(validCheck === 2){
    alert("지난 날짜는 입력할 수 없습니다.");
    duedate.value = "";
  }
  
});

// 리스트 개별 삭제
const delBtn = document.querySelectorAll(".delete-btn");
Array.from(delBtn).forEach((btn) => {
  btn.addEventListener("click", (e: Event) => {  
    // const id: string = btn.id.substring(11);
    const id: string = btn.id.split("delete-btn-")[1];
    
    todos.deleteTodoItem(id);

    location.reload();
  });
});

// 완료 미완료
const radios = document.querySelectorAll(".radios");
Array.from(radios).forEach((radio) => {
  radio.addEventListener("click", (e: Event) => {
    const id: string = radio.id.split("task")[1];
    const str_bool: string = (radio as HTMLInputElement).value;

    todos.updateIsDoneTodoItem(id, str_bool);

    location.reload();
  });
});

// 로컬 스토리지 비우기 (delete all 버튼)
document
  .getElementById("delete-all-btn")!
  .addEventListener("click", (e: Event) => {
    Store.clearLocalStorage();
    location.reload();
  });



// Category 값 변환 함수
/*
function convertToCategory(value: string): EnumCategory {
  switch (value) {
    case "BucketList":
      return EnumCategory.BucketList;
    case "Study":
      return EnumCategory.Study;
    case "Workout":
      return EnumCategory.Workout;
    default:
      throw new Error(`Unknown category: ${value}`);
  }
}
*/

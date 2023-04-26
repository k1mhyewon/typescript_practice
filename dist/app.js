import { TodoTemplate } from "./classes/todo/TodoTemplate.js";
import { Todos } from "./classes/todo/Todos.js";
import { TodoItem } from "./classes/todo/TodoItem.js";
import { TodoStore } from "./classes/todo/TodoStore.js";
const form = document.querySelector(".todo-form");
const category = document.querySelector("#category");
const title = document.querySelector("#title");
const duedate = document.querySelector("#duedate");
const todoTemp = new TodoTemplate();
const todos = new Todos();
// todoTemp.render();
todoTemp.getCategorySelect(); // category select 가져오기 
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let n_id = 0; // todo id값
    let newTodoItem = new TodoItem(n_id.toString(), category.value, title.value, parseInt(duedate.value), false);
    const validCheck = newTodoItem.checkDate(duedate.value);
    // DateValidCheck => 0: pass(true) 1:invalid date(false) 2:past date(false)
    if (validCheck === 0) { // 0: pass(true)
        const todoList = TodoStore.getTodoItems();
        if (todoList.length > 0) {
            n_id = parseInt(todoList[todoList.length - 1].todoId) + 1;
            newTodoItem.todoId = n_id.toString();
        }
        todos.addTodoItem(newTodoItem);
        // 폼 초기화
        // title.value = "";
        // duedate.value = "";
        location.href = 'todoList.html';
    }
    else if (validCheck === 1) { // 1:invalid date(false)
        alert("날짜를 올바르게 입력하세요");
        duedate.value = "";
    }
    else if (validCheck === 2) { // 2:past date(false)
        alert("지난 날짜는 입력할 수 없습니다.");
        duedate.value = "";
    }
});
// 리스트 개별 삭제 - list
/*
const delBtn = document.querySelectorAll(".delete-btn");
Array.from(delBtn).forEach((btn) => {
  btn.addEventListener("click", (e: Event) => {
    const id: string = btn.id.split("delete-btn-")[1];
    
    todos.deleteTodoItem(id);

    location.reload();
  });
});
*/
// 완료 미완료 - list
/*
const radios = document.querySelectorAll(".radios");
Array.from(radios).forEach((radio) => {
  radio.addEventListener("click", (e: Event) => {
    const id: string = radio.id.split("task")[1];
    const str_bool: string = (radio as HTMLInputElement).value;

    todos.updateIsDoneTodoItem(id, str_bool);

    location.reload();
  });
});
*/
// 로컬 스토리지 비우기 (delete all 버튼) - list
/*
document
  .getElementById("delete-all-btn")!
  .addEventListener("click", (e: Event) => {
    Store.clearLocalStorage();
    location.reload();
  });
*/

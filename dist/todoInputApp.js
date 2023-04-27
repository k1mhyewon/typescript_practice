import { TodoTemplate } from "./classes/todo/TodoTemplate.js";
import { Todos } from "./classes/todo/Todos.js";
import { TodoItem } from "./classes/todo/TodoItem.js";
import { DateValidCheck } from "./enum/DateValidCheck.js";
import { LocalStorageController } from "./classes/LocalStorageController.js";
const form = document.querySelector(".todo-form");
const category = document.querySelector("#category");
const title = document.querySelector("#title");
const duedate = document.querySelector("#duedate");
const todoTemp = new TodoTemplate();
const todos = new Todos();
todoTemp.emptyCategoryCheck(); // localStorage에 카테고리가 없으면 a태그 띄우기
todoTemp.getCategorySelect(); // category select 가져오기
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let n_id = 0; // todo id값
    let newTodoItem = new TodoItem(n_id.toString(), category.value, title.value, parseInt(duedate.value), false);
    const validCheck = todos.checkDate(duedate.value);
    if (validCheck === DateValidCheck.PASS) {
        const todoList = LocalStorageController.getLocalStorageList("todoList");
        if (todoList.length > 0) {
            n_id = parseInt(todoList[todoList.length - 1].todoId) + 1;
            newTodoItem.todoId = n_id.toString();
        }
        todos.addTodoItem(newTodoItem);
        location.href = "todoList.html";
    }
    else if (validCheck === DateValidCheck.NODATE) {
        alert("날짜를 올바르게 입력하세요");
        duedate.value = "";
    }
    else if (validCheck === DateValidCheck.PASTDATE) {
        alert("지난 날짜는 입력할 수 없습니다.");
        duedate.value = "";
    }
});

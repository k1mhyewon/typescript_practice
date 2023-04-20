import { TodoTemplate } from "./classes/TodoTemplate.js";
const form = document.querySelector(".todo-form");
const category = document.querySelector("#category");
const title = document.querySelector("#title");
const duedate = document.querySelector("#duedate");
const todoTemp = new TodoTemplate();
todoTemp.render();
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const todoTemp = new TodoTemplate();
    const todoList = localStorage.getItem("todoList");
    let todoArray = [];
    let cnt = 0;
    if (todoList) {
        todoArray = JSON.parse(todoList);
        cnt = todoArray.length;
    }
    const todoItem = {
        todoId: cnt.toString(),
        category: category.value,
        title: title.value,
        duedate: parseInt(duedate.value),
        isDone: false,
    };
    todoArray.push(todoItem);
    localStorage.setItem("todoList", JSON.stringify(todoArray));
    todoTemp.addTodo(todoItem, cnt);
    location.reload();
    // 폼 초기화
    title.value = "";
    duedate.value = "";
});
// 로컬 스토리지 비우기 (delete all 버튼)
document
    .getElementById("delete-all-btn")
    .addEventListener("click", (e) => {
    // e.preventDefault();
    localStorage.removeItem("todoList");
    location.reload();
});
// 투두리스트 개별 삭제
const delBtn = document.querySelectorAll(".delete-btn");
Array.from(delBtn).forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const id = btn.id.substring(11);
        const todoList = localStorage.getItem("todoList");
        let todoArray = [];
        todoArray = JSON.parse(todoList);
        todoArray.forEach((todo, index) => {
            if (todo.todoId === id) {
                todoArray.splice(index, 1);
            }
        });
        localStorage.setItem("todoList", JSON.stringify(todoArray));
        location.reload();
    });
});
// 완료 미완료
const radios = document.querySelectorAll(".radios");
Array.from(radios).forEach((radio) => {
    radio.addEventListener("click", (e) => {
        const id = radio.id.substring(4);
        const bool = radio.value;
        const todoList = localStorage.getItem("todoList");
        let todoArray = [];
        todoArray = JSON.parse(todoList);
        todoArray.forEach((todo, index) => {
            if (todo.todoId === id && bool === "true") {
                todo.isDone = true;
                document.getElementById("li" + id).className = "done";
            }
            else if (todo.todoId === id && bool === "false") {
                todo.isDone = false;
                document.getElementById("li" + id).classList.remove("done");
            }
        });
        localStorage.setItem("todoList", JSON.stringify(todoArray));
    });
});

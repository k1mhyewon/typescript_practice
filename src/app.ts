import { TodoItem } from "./interfaces/TodoItem.js";
import { TodoTemplate } from "./classes/TodoTemplate.js";

const form = document.querySelector(".todo-form") as HTMLFormElement;
const category = document.querySelector("#category") as HTMLSelectElement;
const title = document.querySelector("#title") as HTMLInputElement;
const duedate = document.querySelector("#duedate") as HTMLInputElement;

const todoTemp = new TodoTemplate();
todoTemp.render();

form.addEventListener("submit", (e: Event) => {
  e.preventDefault();

  const todoTemp = new TodoTemplate();

  const todoList = localStorage.getItem("todoList");
  let todoArray: TodoItem[] = [];

  let cnt: number = 0;

  if (todoList) {
    todoArray = JSON.parse(todoList);
    cnt = todoArray.length;
  }

  const todoItem: TodoItem = {
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
  .getElementById("delete-all-btn")!
  .addEventListener("click", (e: Event) => {
    // e.preventDefault();

    localStorage.removeItem("todoList");
    location.reload();
  });

// 투두리스트 개별 삭제
const delBtn = document.querySelectorAll(".delete-btn");
Array.from(delBtn).forEach((btn) => {
  btn.addEventListener("click", (e: Event) => {
    const id: string = btn.id.substring(11);

    const todoList = localStorage.getItem("todoList");
    let todoArray: TodoItem[] = [];

    todoArray = JSON.parse(todoList!);

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
  radio.addEventListener("click", (e: Event) => {
    const id: string = radio.id.substring(4);
    const bool: string = (radio as HTMLInputElement).value;

    const todoList = localStorage.getItem("todoList");
    let todoArray: TodoItem[] = [];

    todoArray = JSON.parse(todoList!);

    todoArray.forEach((todo, index) => {
      if (todo.todoId === id && bool === "true") {
        todo.isDone = true;
        document.getElementById("li" + id)!.className = "done";
      } else if (todo.todoId === id && bool === "false") {
        todo.isDone = false;
        document.getElementById("li" + id)!.classList.remove("done");
      }
    });

    localStorage.setItem("todoList", JSON.stringify(todoArray));
  });
});

import { TodoTemplate } from "./classes/todo/TodoTemplate.js";
import { Todos } from "./classes/todo/Todos.js";
import { TodoItem } from "./classes/todo/TodoItem.js";
import { TodoStore } from "./classes/todo/TodoStore.js";
import { DateValidCheck } from "./classes/todo/TodoItem.js"; // enum

const form = document.querySelector(".todo-form") as HTMLFormElement;
const category = document.querySelector("#category") as HTMLSelectElement;
const title = document.querySelector("#title") as HTMLInputElement;
const duedate = document.querySelector("#duedate") as HTMLInputElement;

const todoTemp = new TodoTemplate();
const todos = new Todos();

todoTemp.emptyCategoryCheck(); // localStorage에 카테고리가 없으면 a태그 띄우기
todoTemp.getCategorySelect(); // category select 가져오기

form.addEventListener("submit", (e: Event) => {
  e.preventDefault();

  let n_id: number = 0; // todo id값

  let newTodoItem = new TodoItem(
    n_id.toString(),
    category.value,
    title.value,
    parseInt(duedate.value),
    false
  );

  const validCheck: DateValidCheck = newTodoItem.checkDate(duedate.value);
  // 날짜 유효성 검사 DateValidCheck => 0: pass(true) 1:invalid date(false) 2:past date(false)

  if (validCheck === 0) {
    const todoList: TodoItem[] = TodoStore.getTodoItems();

    if (todoList.length > 0) {
      n_id = parseInt(todoList[todoList.length - 1].todoId) + 1;
      newTodoItem.todoId = n_id.toString();
    }

    todos.addTodoItem(newTodoItem);
    location.href = "todoList.html";
  } else if (validCheck === 1) {
    alert("날짜를 올바르게 입력하세요");
    duedate.value = "";
  } else if (validCheck === 2) {
    alert("지난 날짜는 입력할 수 없습니다.");
    duedate.value = "";
  }
});

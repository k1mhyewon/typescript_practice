import { TodoItem } from "../interfaces/TodoItem";

export class TodoTemplate {
  // 보여주는
  constructor() {}

  render() {
    const ul = document.querySelector("ul");

    const todoList = localStorage.getItem("todoList");
    let todoArray: TodoItem[] = [];

    if (todoList) {
      // 로컬에 있다면
      todoArray = JSON.parse(todoList);

      todoArray.forEach((todo, i) => {
        this.addTodo(todo, Number(todo.todoId));
      });
    } else {
      // 로컬에 없다면
      const li = document.createElement("li");

      // const noContent = document.createElement("h4");
      li.textContent = "내용 없음";

      ul!.append(li);
    }
  }

  addTodo(todoItem: TodoItem, i: number) {
    const ul = document.querySelector("ul");
    const li = document.createElement("li");
    li.id = "li" + i;

    const inputDone = document.createElement("input");
    inputDone.type = "radio";
    inputDone.id = "task" + i;
    inputDone.name = "task" + i;
    inputDone.value = "true";
    inputDone.className = "radios";

    const labelDone = document.createElement("label");
    labelDone.htmlFor = "task" + i;
    labelDone.textContent = "Done";

    const inputUndone = document.createElement("input");
    inputUndone.type = "radio";
    inputUndone.id = "task" + i;
    inputUndone.name = "task" + i;
    inputUndone.value = "false";
    inputUndone.className = "radios";

    const labelUndone = document.createElement("label");
    labelUndone.htmlFor = "task" + i;
    labelUndone.textContent = "Undone";

    if (todoItem.isDone) {
      inputDone.checked = true;
      li.className = "done";
    } else {
      inputUndone.checked = true;
    }

    const category = document.createElement("h3");
    category.textContent = todoItem.category.toString();

    const duedate = document.createElement("h4");
    duedate.textContent = todoItem.duedate.toString();

    const title = document.createElement("h4");
    title.textContent = todoItem.title;

    const button = document.createElement("button");
    button.textContent = "delete";
    button.setAttribute("class", "delete-btn");
    button.setAttribute("id", "delete-btn-" + i);

    li.append(
      inputDone,
      labelDone,
      inputUndone,
      labelUndone,
      category,
      duedate,
      title,
      button
    );
    ul!.append(li);
  }
}

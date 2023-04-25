import { TodoItem } from "../interfaces/TodoItem.js";
import { Store } from "./Store.js";
import { DateValidCheck } from "../interfaces/TodoItem.js";
import { CategoryStore } from "./CategoryStore.js";

export class TodoTemplate {
  private todoItems: TodoItem[];

  constructor(){
    this.todoItems = Store.getTodoItems();
  }

  /*
TodoTemplate 클래스의 생성자는 HTMLUListElement 타입의 ul 멤버 변수를 생성하고, 
이 ul 변수를 document.querySelector("ul")로 초기화한다. 
이 코드는 HTML 문서 내에 있는 첫 번째 ul 엘리먼트를 선택하게 된다.
  */

  render() {
    const ul = document.querySelector("ul");
    // console.log(this.todoItems);

    this.getCategorySelect(); // category select 가져오기 
    
    if (this.todoItems.length > 0) {
      // 로컬에 있다면
      this.todoItems.forEach((todo) => {
        this.addTodo(todo);
      });

    } else if(this.todoItems.length == 0) {
      // 로컬에 없다면
      const li = document.createElement("li");
      li.textContent = "내용 없음";

      ul!.append(li);
    }
  }

  addTodo(todo: TodoItem) {
    const todoItem = new TodoItem(
      todo.todoId,
      todo.category,
      todo.title,
      todo.duedate,
      false
  );

    const ul = document.querySelector("ul");
    const li = document.createElement("li");
    li.id = "li" + todo.todoId;

    const inputDone = document.createElement("input");
    inputDone.type = "radio";
    inputDone.id = "task" + todo.todoId;
    inputDone.name = "task" + todo.todoId;
    inputDone.value = "true";
    inputDone.className = "radios";

    const labelDone = document.createElement("label");
    labelDone.htmlFor = "task" + todo.todoId;
    labelDone.textContent = "Done";

    const inputUndone = document.createElement("input");
    inputUndone.type = "radio";
    inputUndone.id = "task" + todo.todoId;
    inputUndone.name = "task" + todo.todoId;
    inputUndone.value = "false";
    inputUndone.className = "radios";

    const labelUndone = document.createElement("label");
    labelUndone.htmlFor = "task" + todo.todoId;
    labelUndone.textContent = "Undone";

    if (todo.isDone) {
      inputDone.checked = true;
      li.className = "done";
    } else {
      inputUndone.checked = true;
    }

    const category = document.createElement("h3");
    category.textContent = "[" + todo.category.toString() + "]";

    const validcheck: DateValidCheck = todoItem.checkDate(todo.duedate.toString());

    const duedate = document.createElement("h4");
    duedate.textContent = "Due date: " + todo.duedate.toString();

    if( validcheck === 2){
      duedate.setAttribute("class", "due-date-over");
    }

    const title = document.createElement("h4");
    title.textContent = todo.title;

    const button = document.createElement("button");
    button.textContent = "delete";
    button.setAttribute("class", "delete-btn");
    button.setAttribute("id", "delete-btn-" + todo.todoId);

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

  getCategorySelect() {
    const categories: string[] = CategoryStore.getCategoryList();

    const select = document.querySelector("select");

    for(let category of categories) {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;

      select?.append(option);
    }

    // <option value="Workout">Workout</option>
  }


}


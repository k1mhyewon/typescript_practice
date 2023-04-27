import { TodoItem } from "./TodoItem.js";
import { DateValidCheck } from "../../enum/DateValidCheck.js";
import { Todos } from "./Todos.js";
import { LocalStorageController } from "../LocalStorageController.js";

const todos = new Todos();

export class TodoTemplate {
  private todoItems: TodoItem[];

  constructor(){
    this.todoItems = LocalStorageController.getLocalStorageList<TodoItem[]>("todoList");
  }


  render() {
    const ul = document.querySelector("ul");
    
    if (this.todoItems.length > 0) { // 로컬에 있다면
      this.todoItems.forEach((todo: TodoItem) => {
        this.addTodo(todo);
      });

    } else if(this.todoItems.length == 0) { // 로컬에 없다면
      const li = document.createElement("li");
      li.textContent = "내용 없음";

      ul!.append(li);
    }
  }

  addTodo(todo: TodoItem) {
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
    labelDone.innerHTML = "Done";

    const inputUndone = document.createElement("input");
    inputUndone.type = "radio";
    inputUndone.id = "task" + todo.todoId;
    inputUndone.name = "task" + todo.todoId;
    inputUndone.value = "false";
    inputUndone.className = "radios";

    const labelUndone = document.createElement("label");
    labelUndone.htmlFor = "task" + todo.todoId;
    labelUndone.innerHTML = "Undone";

    if (todo.isDone) {
      inputDone.checked = true;
      li.className = "done";
    } else {
      inputUndone.checked = true;
    }

    const category = document.createElement("h3");
    category.innerHTML = "[" + todo.category.toString() + "]";

    console.log(todo.duedate.toString());
    const validcheck: DateValidCheck = todos.checkDate(todo.duedate.toString());

    const duedate = document.createElement("h4");
    duedate.innerHTML = "Due date: " + todo.duedate.toString();

    if( validcheck === DateValidCheck.PASTDATE){ // duedate가 지났다면 줄 그어주는 css 클래스 추가
      duedate.setAttribute("class", "due-date-over");
    }

    const title = document.createElement("h4");
    title.innerHTML = todo.title;

    const button = document.createElement("button");
    button.innerHTML = "delete";
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

  // localStorage에 있는 "categoryList" 키값을 가진 value 얻어와서 select에 넣어주기
  getCategorySelect() {
    // const categories: string[] = CategoryStore.getCategoryList();
    const categories = LocalStorageController.getLocalStorageList<string[]>("categoryList");

    const select = document.querySelector("select");

    for(let category of categories) {
      const option = document.createElement("option");
      option.value = category;
      option.innerHTML = category;

      select?.append(option);
    }

    // <option value="Workout">Workout</option>
  }

  // 카테고리 항목이 없다면 안내문구 보여주기
  emptyCategoryCheck() {
    const categories = LocalStorageController.getLocalStorageList<string[]>("categoryList");

    let aTagCategory = document.querySelector("#empty-categoty-alert") as HTMLSelectElement;

    if(!categories || categories.length === 0){      
      aTagCategory.removeAttribute("class");
    }
  }

}


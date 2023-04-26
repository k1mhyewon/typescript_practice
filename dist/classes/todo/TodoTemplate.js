import { TodoItem } from "./TodoItem.js";
import { TodoStore } from "./TodoStore.js";
import { CategoryStore } from "../category/CategoryStore.js";
export class TodoTemplate {
    constructor() {
        this.todoItems = TodoStore.getTodoItems();
    }
    render() {
        const ul = document.querySelector("ul");
        if (this.todoItems.length > 0) { // 로컬에 있다면
            this.todoItems.forEach((todo) => {
                this.addTodo(todo);
            });
        }
        else if (this.todoItems.length == 0) { // 로컬에 없다면
            const li = document.createElement("li");
            li.textContent = "내용 없음";
            ul.append(li);
        }
    }
    addTodo(todo) {
        const todoItem = new TodoItem(todo.todoId, todo.category, todo.title, todo.duedate, false);
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
        }
        else {
            inputUndone.checked = true;
        }
        const category = document.createElement("h3");
        category.textContent = "[" + todo.category.toString() + "]";
        const validcheck = todoItem.checkDate(todo.duedate.toString());
        const duedate = document.createElement("h4");
        duedate.textContent = "Due date: " + todo.duedate.toString();
        if (validcheck === 2) { // duedate가 지났다면
            duedate.setAttribute("class", "due-date-over");
        }
        const title = document.createElement("h4");
        title.textContent = todo.title;
        const button = document.createElement("button");
        button.textContent = "delete";
        button.setAttribute("class", "delete-btn");
        button.setAttribute("id", "delete-btn-" + todo.todoId);
        li.append(inputDone, labelDone, inputUndone, labelUndone, category, duedate, title, button);
        ul.append(li);
    }
    // localStorage에 있는 "categoryList" 키값을 가진 value 얻어와서 select에 넣어주기
    getCategorySelect() {
        const categories = CategoryStore.getCategoryList();
        const select = document.querySelector("select");
        for (let category of categories) {
            const option = document.createElement("option");
            option.value = category;
            option.textContent = category;
            select === null || select === void 0 ? void 0 : select.append(option);
        }
        // <option value="Workout">Workout</option>
    }
    // 카테고리 항목이 없다면 안내문구 보여주기
    emptyCategoryCheck() {
        const categories = CategoryStore.getCategoryList();
        let aTagCategory = document.querySelector("#empty-categoty-alert");
        if (!categories || categories.length === 0) {
            console.log("empty");
            aTagCategory.removeAttribute("class");
        }
    }
}

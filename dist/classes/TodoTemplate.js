export class TodoTemplate {
    constructor() {
        this.ul = document.querySelector("ul");
    }
    /*
  TodoTemplate 클래스의 생성자는 HTMLUListElement 타입의 ul 멤버 변수를 생성하고,
  이 ul 변수를 document.querySelector("ul")로 초기화한다.
  이 코드는 HTML 문서 내에 있는 첫 번째 ul 엘리먼트를 선택하게 된다.
    */
    render() {
        const todoList = localStorage.getItem("todoList");
        let todoArray = [];
        if (todoList) {
            // 로컬에 있다면
            todoArray = JSON.parse(todoList);
            todoArray.forEach((todo, i) => {
                this.addTodo(todo, Number(todo.todoId));
            });
        }
        else {
            // 로컬에 없다면
            const li = document.createElement("li");
            li.textContent = "내용 없음";
            this.ul.append(li);
        }
    }
    /*
    render() 메소드는 localStorage에서 TodoList를 가져와 TodoItem 객체의 배열로 만든 후,
    각 TodoItem 객체를 addTodo() 메소드를 통해 리스트에 추가한다.
  만약 TodoList가 없다면, "내용 없음"을 표시하는 li 엘리먼트를 생성하여 ul 엘리먼트에 추가한다.
    */
    addTodo(todos, i) {
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
        if (todos.isDone) {
            inputDone.checked = true;
            li.className = "done";
        }
        else {
            inputUndone.checked = true;
        }
        const category = document.createElement("h3");
        category.textContent = "[" + todos.category.toString() + "]";
        const duedate = document.createElement("h4");
        duedate.textContent = "Due date: " + todos.duedate.toString();
        const title = document.createElement("h4");
        title.textContent = todos.title;
        const button = document.createElement("button");
        button.textContent = "delete";
        button.setAttribute("class", "delete-btn");
        button.setAttribute("id", "delete-btn-" + i);
        li.append(inputDone, labelDone, inputUndone, labelUndone, category, duedate, title, button);
        this.ul.append(li);
    }
}
/*
TodoTemplate 클래스를 정의하는 것으로,
TodoList를 보여주기 위한 HTML 엘리먼트를 생성하는 메소드와,
TodoItem 객체를 받아서 리스트에 추가하는 메소드를 가지고 있다.
*/

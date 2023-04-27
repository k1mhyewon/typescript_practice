export class TodoStore {
    // TodoItem 들을 얻어오는 함수
    static getTodoItems() {
        let todoList = localStorage.getItem("todoList");
        if (todoList) {
            return JSON.parse(todoList);
        }
        else {
            return [];
        }
    }
    // localStorage에 저장
    static saveTodoItems(item) {
        localStorage.setItem("todoList", JSON.stringify(item));
    }
    // localStorage 비우기
    static clearLocalStorage() {
        localStorage.removeItem("todoList");
    }
}

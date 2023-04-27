// TodoItem 안의 데이터를 관리하는 역할만 한다
import { TodoItem } from "./TodoItem.js";

export class TodoStore {

    // TodoItem 들을 얻어오는 함수
    static getTodoItems(): TodoItem[] {
        let todoList = localStorage.getItem("todoList");

        if (todoList) {
            return JSON.parse(todoList);
        }
        else {
            return [];
        }
    }

    // localStorage에 저장
    static saveTodoItems(item: TodoItem[]): void {
        localStorage.setItem("todoList", JSON.stringify(item));
    }


    // localStorage 비우기
    static clearLocalStorage(): void {
        localStorage.removeItem("todoList");
    }
}
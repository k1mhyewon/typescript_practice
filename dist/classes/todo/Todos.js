import { DateValidCheck } from "../../enum/DateValidCheck.js";
import { LocalStorageController } from "../LocalStorageController.js";
export class Todos {
    constructor() {
        this.todoItems = LocalStorageController.getLocalStorageList("todoList");
    }
    // todo item 추가하기
    addTodoItem(item) {
        this.todoItems.push(item); // 새로운 item 추가
        LocalStorageController.saveLocalStorage("todoList", this.todoItems);
    }
    // isDone 업데이트
    updateIsDoneTodoItem(id, str_bool) {
        for (const todo of this.todoItems) {
            if (todo.todoId === id && str_bool === "true") {
                todo.isDone = true;
            }
            else if (todo.todoId === id && str_bool === "false") {
                todo.isDone = false;
            }
        }
        LocalStorageController.saveLocalStorage("todoList", this.todoItems);
    }
    // 날짜 유효성 검사
    checkDate(duedate) {
        let dateComp = duedate.substring(0, 4) +
            "-" +
            duedate.substring(4, 6) +
            "-" +
            duedate.substring(6, 8);
        let result = DateValidCheck.NODATE;
        try {
            const now = new Date();
            const inputDate = new Date(dateComp);
            inputDate.toISOString();
            result = DateValidCheck.PASS; // 0: pass(true)
            if (inputDate < now) {
                result = DateValidCheck.PASTDATE; // 2: past date(false)
            }
        }
        catch (e) {
            result = DateValidCheck.NODATE; // 1: invalid date(false)
            console.log(e);
        }
        return result;
    }
    // todo 삭제하기
    deleteTodoItem(id) {
        this.todoItems = this.todoItems.filter((e) => e.todoId !== id); // 받아온 id 값과 일치하는 부분만 삭제
        LocalStorageController.saveLocalStorage("todoList", this.todoItems);
    }
}
/*
    if(this.todoItems.length > 0) {
      this.todoItems = this.todoItems.filter((e) =>  e.todoId !== id); // 받아온 id 값과 일치하는 부분만 삭제
      TodoStore.saveTodoItems(this.todoItems); // localStorage에 저장
    }
    else {
      TodoStore.clearLocalStorage(); // localStorage clear
    }
*/

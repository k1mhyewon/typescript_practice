import { TodoStore } from "./TodoStore.js";
// TodoItem 클래스를 멤버로 가지고 있고 todo를 등록/수정/삭제하는 역할만 한다
export class Todos {
    constructor() {
        this.todoItems = TodoStore.getTodoItems();
    }
    // todo item 추가하기
    addTodoItem(item) {
        this.todoItems.push(item); // 새로운 item 추가
        TodoStore.saveTodoItems(this.todoItems); // localStorage에 저장
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
        TodoStore.saveTodoItems(this.todoItems);
    }
    // 날짜 유효성 검사
    checkDate(duedate) {
        let dateComp = duedate.substring(0, 4) +
            "-" +
            duedate.substring(4, 6) +
            "-" +
            duedate.substring(6, 8);
        let result = 1;
        // 0: pass(true) 1:invalid date(false) 2:past date(false)
        try {
            const now = new Date();
            const inputDate = new Date(dateComp);
            inputDate.toISOString();
            result = 0; // 0: pass(true)
            if (inputDate < now) {
                result = 2; // 2: past date(false)
            }
        }
        catch (e) {
            result = 1; // 1: invalid date(false)
            console.log(e);
        }
        return result;
    }
    // todo 삭제하기
    deleteTodoItem(id) {
        this.todoItems = this.todoItems.filter((e) => e.todoId !== id); // 받아온 id 값과 일치하는 부분만 삭제
        TodoStore.saveTodoItems(this.todoItems); // localStorage에 저장
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

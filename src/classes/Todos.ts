import { TodoItem } from "../interfaces/TodoItem.js";
import { Store } from "./Store.js";

// TodoItem 클래스를 멤버로 가지고 있고 todo를 등록/수정/삭제하는 역할만 한다
export class Todos {

  private todoItems: TodoItem[];

  constructor(){
    this.todoItems = Store.getTodoItems();
  }

  // todo item 추가하기
  addTodoItem(item: TodoItem): void {
    this.todoItems.push(item); // 새로운 item 추가
    Store.saveTodoItems(this.todoItems); // localStorage에 저장
  }

  // isDone 업데이트
  updateIsDoneTodoItem(id: string, str_bool: string) {
    for (const todo of this.todoItems) {
      if (todo.todoId === id && str_bool === "true") {
        todo.isDone = true;
      } else if (todo.todoId === id && str_bool === "false") {
        todo.isDone = false;
      }
    }
    
    Store.saveTodoItems(this.todoItems);
  }

  // todo 삭제하기
  deleteTodoItem(id: string): void {
    if(this.todoItems.length > 0) {
      this.todoItems = this.todoItems.filter((e) =>  e.todoId !== id); // 받아온 id 값과 일치하는 부분만 삭제
      Store.saveTodoItems(this.todoItems); // localStorage에 저장
    }
    else {
      console.log("length else");
      Store.clearLocalStorage(); // localStorage clear
    }

  }

   // getTodoItems(): TodoItem[] {
  //   return this.todoItems;
  // }
  
}



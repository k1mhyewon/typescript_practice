import { TodoItem } from "../todo/TodoItem.js";
import { CategoryStore } from "./CategoryStore.js";
import { LocalStorageController } from "../LocalStorageController.js";

export class Categories {
  private categories: string[];
  private todoItems: TodoItem[];

  constructor() {
    this.categories = LocalStorageController.getLocalStorageList<string[]>("categoryList");
    this.todoItems = LocalStorageController.getLocalStorageList<TodoItem[]>("todoList");
  }

  // category 중복 검사
  categoryValidCheck(item: string): boolean {
    for (let category of this.categories) {
      if (item === category) {
        return true;
      }
    }
    return false;
  }

  // category 추가
  addCategory(item: string): void {
    this.categories.push(item);
    CategoryStore.saveCategory(this.categories);
  }

  // category 삭제 유효성 검사 - true 이면 사용중인 카테고리(삭제 불가)
  checkCategoryUsed(item: string): boolean {
    for (const todo of this.todoItems) {
      if (todo.category === item) {
        return true;
      }
    }
    return false;
  }

  // category 삭제
  deleteCategory(item: string): void {
    this.categories.filter((e) => e !== item);
    CategoryStore.saveCategory(this.categories);
  }
}

import { TodoStore } from "../todo/TodoStore.js";
import { CategoryStore } from "./CategoryStore.js";
const categoryStore = new CategoryStore();
export class Categories {
    constructor() {
        this.categories = CategoryStore.getCategoryList();
        this.todoItems = TodoStore.getTodoItems();
    }
    // category 중복 검사
    categoryValidCheck(item) {
        for (let category of this.categories) {
            if (item === category) {
                return true;
            }
        }
        return false;
    }
    // category 추가
    addCategory(item) {
        let categories = CategoryStore.getCategoryList();
        categories.push(item);
        CategoryStore.saveCategory(categories);
    }
    // category 삭제 유효성 검사 - true 이면 사용중인 카테고리(삭제 불가)
    checkCategoryUsed(item) {
        for (const todo of this.todoItems) {
            if (todo.category === item) {
                return true;
            }
        }
        return false;
    }
    // category 삭제
    deleteCategory(item) {
        let categories = CategoryStore.getCategoryList();
        categories = categories.filter((e) => e !== item);
        CategoryStore.saveCategory(categories);
    }
}

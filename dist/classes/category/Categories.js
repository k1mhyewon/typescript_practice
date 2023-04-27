import { LocalStorageController } from "../LocalStorageController.js";
export class Categories {
    constructor() {
        this.categories = LocalStorageController.getLocalStorageList("categoryList");
        this.todoItems = LocalStorageController.getLocalStorageList("todoList");
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
        this.categories.push(item);
        LocalStorageController.saveLocalStorage("categoryList", this.categories);
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
        this.categories.filter((e) => e !== item);
        LocalStorageController.saveLocalStorage("categoryList", this.categories);
    }
}

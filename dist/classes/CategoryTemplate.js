import { CategoryStore } from "./CategoryStore.js";
export class CategoryTemplate {
    render() {
        let categories = CategoryStore.getCategoryList(); // string[] 형태로 반환
        categories.forEach(e => {
            this.addCategory(e);
        });
    }
    addCategory(item) {
        const ul = document.querySelector("ul");
        const li = document.createElement("li");
        li.className = "category-item";
        const span = document.createElement("span");
        span.textContent = item;
        const button = document.createElement("button");
        button.textContent = "Del";
        button.className = "delete-button";
        button.id = item;
        li.append(span, button);
        ul === null || ul === void 0 ? void 0 : ul.append(li);
        /*
        <li class="category-item">
            <span>Workout</span>
            <button class="delete-button" id="Workout">Del</button>
        </li>
        */
    }
}

import { CategoryTemplate } from "./classes/category/CategoryTemplate.js";
import { Categories } from "./classes/category/Categories.js";
const categoryform = document.querySelector(".category-input-form");
const inputName = document.querySelector("#category-input");
const categoryTemp = new CategoryTemplate();
const categories = new Categories();
categoryTemp.render();
// category 추가하기
categoryform.addEventListener("submit", (e) => {
    // e.preventDefault();
    const bool = categories.categoryValidCheck(inputName.value);
    if (bool) {
        alert("이미 존재하는 카테고리명입니다.");
    }
    else {
        categories.addCategory(inputName.value);
    }
});
// 카테고리 개별 삭제
const delBtn = document.querySelectorAll(".delete-button");
delBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const id = btn.id;
        // category 삭제 유효성 검사 - true 이면 사용중인 카테고리(삭제 불가)
        const bool = categories.checkCategoryUsed(id);
        if (!bool) {
            categories.deleteCategory(id);
        }
        else {
            alert("현재 사용중인 카테고리이므로 삭제가 불가합니다.");
        }
        // location.reload();
    });
});

export class CategoryStore {
    // CategoryList 들을 얻어오는 함수
    static getCategoryList() {
        let categoryList = localStorage.getItem("categoryList");
        if (categoryList) {
            return JSON.parse(categoryList);
        }
        else {
            return [];
        }
    }
    // localStorage에 저장
    static saveCategory(item) {
        localStorage.setItem("categoryList", JSON.stringify(item));
    }
}

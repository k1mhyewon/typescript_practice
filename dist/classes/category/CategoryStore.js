export class CategoryStore {
    // CategoryList 들을 얻어오는 함수
    static getCategoryList() {
        let categoryList = localStorage.getItem("categoryList");
        if (categoryList) {
            return JSON.parse(categoryList);
            // 가져온 데이터가 있다면 JSON.parse() 메소드를 사용하여 JSON 문자열을 파싱하고 TodoItem[] 형태로 변환하여 반환한다.
        }
        else {
            return [];
            // 가져온 데이터가 없다면 빈 배열([])을 반환한다.
        }
    }
    // localStorage에 저장
    static saveCategory(item) {
        localStorage.setItem("categoryList", JSON.stringify(item));
    }
}

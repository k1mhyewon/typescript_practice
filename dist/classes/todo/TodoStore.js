export class TodoStore {
    // TodoItem 들을 얻어오는 함수
    static getTodoItems() {
        let todoList = localStorage.getItem("todoList");
        if (todoList) {
            return JSON.parse(todoList);
            // 가져온 데이터가 있다면 JSON.parse() 메소드를 사용하여 JSON 문자열을 파싱하고 TodoItem[] 형태로 변환하여 반환한다.
        }
        else {
            return [];
            // 가져온 데이터가 없다면 빈 배열([])을 반환한다.
        }
    }
    // localStorage에 저장
    static saveTodoItems(item) {
        localStorage.setItem("todoList", JSON.stringify(item));
    }
    // localStorage 비우기
    static clearLocalStorage() {
        localStorage.removeItem("todoList");
    }
}

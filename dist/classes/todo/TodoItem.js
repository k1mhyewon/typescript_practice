export var DateValidCheck;
(function (DateValidCheck) {
    DateValidCheck[DateValidCheck["PASS"] = 0] = "PASS";
    DateValidCheck[DateValidCheck["NODATE"] = 1] = "NODATE";
    DateValidCheck[DateValidCheck["PASTDATE"] = 2] = "PASTDATE";
})(DateValidCheck || (DateValidCheck = {}));
// TodoItem 클래스 - todo를 등록하고 검증하는 역할만 한다
export class TodoItem {
    constructor(todoId, category, title, duedate, isDone) {
        this.todoId = todoId;
        this.category = category;
        this.title = title;
        this.duedate = duedate;
        this.isDone = isDone;
    }
}

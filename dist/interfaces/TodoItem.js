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
    // 날짜 유효성 검사
    checkDate(duedate) {
        let dateComp = duedate.substring(0, 4) +
            "-" +
            duedate.substring(4, 6) +
            "-" +
            duedate.substring(6, 8);
        let result = 1;
        // 0: pass(true) 1:invalid date(false) 2:past date(false)
        try {
            const now = new Date();
            const inputDate = new Date(dateComp);
            inputDate.toISOString();
            result = 0; // 0: pass(true)
            if (inputDate < now) {
                result = 2; // 2: past date(false)
            }
        }
        catch (e) {
            result = 1; // 1: invalid date(false)
            console.log(e);
        }
        return result;
    }
}

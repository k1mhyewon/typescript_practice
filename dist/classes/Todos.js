export class Todos {
    constructor(todoId, category, title, duedate, isDone) {
        this.todoId = todoId;
        this.category = category;
        this.title = title;
        this.duedate = duedate;
        this.isDone = isDone;
    }
}
/*
Todos라는 클래스를 정의하고 있다.
Todos 클래스는 TodoItem 인터페이스를 구현하고 있으며, Category 열거형을 참조하고 있다.

TodoItem 인터페이스는 todoId, category, title, duedate, isDone 속성으로 구성되어 있으며,
Todos 클래스는 이 인터페이스를 구현하도록 되어 있다.

Todos 클래스는 생성자를 통해 todoId, category, title, duedate, isDone 속성 값을 받아서 객체를 생성한다.
이렇게 생성된 Todos 객체는 TodoItem 인터페이스의 모든 속성을 가지고 있다.

즉, Todos 클래스는 할 일 목록을 표현하는 객체이며, 이 객체는 할 일의 ID, 카테고리, 제목, 마감 기한, 완료 여부 등의
정보를 가지고 있다. 이러한 정보들을 생성자를 통해 입력받아 객체를 생성할 수 있다.

*/

export var EnumCategory;
(function (EnumCategory) {
    EnumCategory["BucketList"] = "BucketList";
    EnumCategory["Study"] = "Study";
    EnumCategory["Workout"] = "Workout";
})(EnumCategory || (EnumCategory = {}));
/*
TypeScript를 사용하여 TodoList 앱에서 사용될 인터페이스와 열거형(enum)을 정의하는 코드이다.

TodoItem 인터페이스는 TodoList에 추가될 각 Todo 아이템을 설명한다.
인터페이스 내에는 todoId, category, title, duedate, isDone의 5개 프로퍼티가 있다.

Category는 TodoItem의 category 프로퍼티에서 사용되는 열거형이다. 열거형은 상수의 집합으로,
특정 상수 값에 이름을 지정하는 것이다.
예를 들어, BucketList는 "BucketList"라는 문자열 값에 해당하는 상수이며, Study는 "Study"에 해당하는 상수이다.

이렇게 인터페이스와 열거형을 사용하면 코드 내에서 각각의 Todo 아이템과 카테고리를 구분하고 사용하기 쉬워지며,
코드의 가독성과 유지보수성이 높아진다.




*/

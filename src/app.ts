import { TodoTemplate } from "./classes/TodoTemplate.js";
import { Todos } from "./classes/Todos.js";
import { EnumCategory } from "./interfaces/TodoItem.js";
// 클래스 및 인터페이스 가져오기

const form = document.querySelector(".todo-form") as HTMLFormElement;
const category = document.querySelector("#category") as HTMLSelectElement;
const title = document.querySelector("#title") as HTMLInputElement;
const duedate = document.querySelector("#duedate") as HTMLInputElement;
// HTML 폼 요소들 가져오기. 사용자가 할 일을 추가할 때 필요한 정보들이다.

const todoTemp = new TodoTemplate();
todoTemp.render();
// TodoTemplate 클래스의 객체를 생성하고, render() 메소드를 호출하여 할 일 목록을 화면에 그린다.

// 폼을 제출(submit)할 때 발생하는 이벤트에 대한 핸들러를 등록한다.
// 사용자가 입력한 정보를 가지고 새로운 할 일(Todos 객체)를 생성하고, 로컬 스토리지에 저장한다.
form.addEventListener("submit", (e: Event) => {
  // e.preventDefault();

  const todoList = localStorage.getItem("todoList");

  let n_id: number = 0; // todo id값

  let dateComp: string =
    duedate.value.substring(0, 4) +
    "-" +
    duedate.value.substring(4, 6) +
    "-" +
    duedate.value.substring(6, 8);

  try {
    new Date(dateComp).toISOString();

    let todoArray: Todos[] = [];

    if (todoList) {
      todoArray = JSON.parse(todoList);
      n_id = parseInt(todoArray[todoArray.length - 1].todoId) + 1;
    }

    const todos = new Todos(
      n_id.toString(),
      convertToCategory(category.value),
      title.value,
      parseInt(duedate.value),
      false
    );

    todoArray.push(todos);
    localStorage.setItem("todoList", JSON.stringify(todoArray));

    todoTemp.addTodo(todos, n_id);

    // 폼 초기화
    title.value = "";
    duedate.value = "";
  } catch (event) {
    alert("날짜를 올바르게 입력하세요");
    duedate.value = "";
  }
});

// 리스트 개별 삭제
/* 삭제 버튼을 클릭할 때 발생하는 이벤트에 대한 핸들러를 등록한다.
   사용자가 선택한 할 일을 로컬 스토리지에서 삭제하고, 화면에서 해당 항목을 삭제한다. */
const delBtn = document.querySelectorAll(".delete-btn");
Array.from(delBtn).forEach((btn) => {
  btn.addEventListener("click", (e: Event) => {
    const id: string = btn.id.substring(11); // button.setAttribute("id", "delete-btn-" + i);

    const todoList = localStorage.getItem("todoList");
    let todoArray: Todos[] = [];

    todoArray = JSON.parse(todoList!);

    todoArray = todoArray.filter((todo) => todo.todoId !== id);

    if (todoArray.length > 0) {
      localStorage.setItem("todoList", JSON.stringify(todoArray));
    } else {
      localStorage.removeItem("todoList");
    }

    location.reload();
  });
});

// 완료 미완료
/* 라디오 버튼을 클릭할 때 발생하는 이벤트에 대한 핸들러를 등록한다.
   사용자가 선택한 할 일이 완료/미완료 상태가 되도록 처리한다. */
const radios = document.querySelectorAll(".radios");
Array.from(radios).forEach((radio) => {
  radio.addEventListener("click", (e: Event) => {
    const id: string = radio.id.substring(4);
    const bool: string = (radio as HTMLInputElement).value;

    const todoList = localStorage.getItem("todoList");
    let todoArray: Todos[] = [];

    todoArray = JSON.parse(todoList!);

    for (const todo of todoArray) {
      if (todo.todoId === id && bool === "true") {
        todo.isDone = true;
        document.getElementById("li" + id)!.className = "done";
      } else if (todo.todoId === id && bool === "false") {
        todo.isDone = false;
        document.getElementById("li" + id)!.classList.remove("done");
      }
    }

    localStorage.setItem("todoList", JSON.stringify(todoArray));
  });
});

// 로컬 스토리지 비우기 (delete all 버튼)
/* "Delete All" 버튼을 클릭할 때 발생하는 이벤트에 대한 핸들러를 등록한다.
   로컬 스토리지에 저장된 모든 할 일 목록을 삭제한다. */
document
  .getElementById("delete-all-btn")!
  .addEventListener("click", (e: Event) => {
    localStorage.removeItem("todoList");
    location.reload();
  });

// Category 값 변환 함수
function convertToCategory(value: string): EnumCategory {
  switch (value) {
    case "BucketList":
      return EnumCategory.BucketList;
    case "Study":
      return EnumCategory.Study;
    case "Workout":
      return EnumCategory.Workout;
    default:
      throw new Error(`Unknown category: ${value}`);
  }
}
/* 
Category라는 열거형(enum) 타입을 정의하는 인터페이스 파일에서 Category 값을 참조하여
입력된 value 값이 BucketList, Study, Workout 중 하나인지 확인하여 해당하는 카테고리 값으로 변환하는 
convertToCategory 함수를 선언한다. 
이 함수는 value 값이 알려지지 않은 경우에는 에러를 던진다.

그리고나서 이 함수를 이벤트 핸들러에서 사용하여 HTML 폼에서 선택된 카테고리 값을 Category 타입으로 변환한다. 
이렇게 변환된 카테고리 값은 새로운 할 일(Todos) 객체를 만들 때 사용된다.
*/

/*
자바스크립트는 느슨한 타입 체크 언어이기 때문에 변수나 함수의 매개변수, 반환값 등의 타입을 명시적으로 지정하지 않아도 된다. 
하지만 이러한 유연성 때문에 오류가 발생할 가능성이 높아진다.

타입스크립트는 정적 타입 체크 언어로써, 변수와 함수의 매개변수, 반환값 등의 타입을 명시적으로 지정해야 한다. 
이를 통해 코드의 가독성을 높이고, 오류 발생 확률을 줄일 수 있다. 
또한 타입스크립트는 자바스크립트와 달리 컴파일 단계에서 오류를 발견할 수 있으므로, 
코드를 실행하기 전에 오류를 미리 잡을 수 있다.

ex [js 코드]
function add(a, b) {
  return a + b;
}

console.log(add(5, "5")); // "55"

[ts 코드]
function add(a: number, b: number): number {
  return a + b;
}

console.log(add(5, "5"));

-------------------------------------

로컬 스토리지(Local Storage)
웹 브라우저에서 제공하는 Key-Value 쌍을 저장할 수 있는 영구 저장소
동일한 도메인 내에서 모든 페이지에 대해 사용 가능, 
웹 브라우저를 닫아도 데이터는 보존

데이터를 가져오기 - localStorage 객체의 getItem() 메서드를 사용
데이터 삭제 - removeItem()
로컬스토리지의 모든 데이터 삭제 - clear()

로컬 스토리지는 문자열 형태로 데이터를 저장하기 때문에 저장된 데이터를 불러올 때는 문자열 형태로 반환된다. 
이 때, 우리가 원하는 자바스크립트 객체 형태로 데이터를 사용하려면 문자열을 자바스크립트 객체로 변환해주어야 한다.
JSON.parse() 함수를 사용하면 문자열을 자바스크립트 객체로 변환할 수 있다.
로컬 스토리지에서 데이터를 가져올 때는, JSON.parse() 함수를 사용하여 문자열을 자바스크립트 객체로 변환해주어야 한다. 

--------------------------------------

toISOString()은 Date 객체의 메서드 중 하나이다. 
이 메서드는 UTC (협정 세계 표준시) 기준으로 현재 날짜와 시간을 나타내는 문자열을 반환한다.

const date = new Date();
const isoString = date.toISOString();
console.log(isoString);
// 2023-04-24T12:34:56.789Z

*/

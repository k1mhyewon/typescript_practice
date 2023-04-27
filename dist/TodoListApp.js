import { TodoTemplate } from "./classes/todo/TodoTemplate.js";
import { Todos } from "./classes/todo/Todos.js";
import { LocalStorageController } from "./classes/LocalStorageController.js";
const todoTemp = new TodoTemplate();
const todos = new Todos();
todoTemp.render();
// 리스트 개별 삭제
const delBtn = document.querySelectorAll(".delete-btn");
delBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const id = btn.id.split("delete-btn-")[1];
        todos.deleteTodoItem(id);
        location.reload();
    });
});
// 완료 미완료
const radios = document.querySelectorAll(".radios");
radios.forEach((radio) => {
    radio.addEventListener("click", (e) => {
        const id = radio.id.split("task")[1];
        const str_bool = radio.value;
        todos.updateIsDoneTodoItem(id, str_bool);
        location.reload();
    });
});
// 로컬 스토리지 비우기 (delete all 버튼)
document
    .getElementById("delete-all-btn")
    .addEventListener("click", (e) => {
    LocalStorageController.clearLocalStorage("todoList");
    location.reload();
});

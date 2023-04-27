export class LocalStorageController {
    // LocalStorage 얻어옴
    static getLocalStorageList(name) {
        let localList = localStorage.getItem(name);
        return localList != null ? JSON.parse(localList) : [];
    }
    // localStorage에 저장
    static saveLocalStorage(name, item) {
        localStorage.setItem(name, JSON.stringify(item));
    }
    // localStorage 비우기
    static clearLocalStorage(name) {
        localStorage.removeItem(name);
    }
}

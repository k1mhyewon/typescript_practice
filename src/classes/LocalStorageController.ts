export class LocalStorageController {

    // LocalStorage 얻어옴
    static getLocalStorageList<T>(name: string): T {
        let localList = localStorage.getItem(name);
        
        return localList != null ? JSON.parse(localList) as T : [] as T;
    }

    // localStorage에 저장
    static saveLocalStorage<T>(name: string, item: T): void {
        localStorage.setItem(name, JSON.stringify(item));           
    }

    // localStorage 비우기
    static clearLocalStorage(name: string): void {
        localStorage.removeItem(name);
    }
}


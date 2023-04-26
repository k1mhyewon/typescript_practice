
export enum DateValidCheck {
  PASS,     // 통과
  NODATE,   // 유효하지 않은 날짜
  PASTDATE, // 지난 날짜
} 

export interface InterTodoItem {
  todoId: string;
  category: string;
  title: string;
  duedate: number;
  isDone: boolean;
}

// TodoItem 클래스 - todo를 등록하고 검증하는 역할만 한다
export class TodoItem implements InterTodoItem {
  constructor(
    public todoId: string,
    public category: string,
    public title: string,
    public duedate: number,
    public isDone: boolean
  ) {}

  // 날짜 유효성 검사
  checkDate(duedate: string): DateValidCheck {  
    let dateComp: string =
      duedate.substring(0, 4) +
      "-" +
      duedate.substring(4, 6) +
      "-" +
      duedate.substring(6, 8);

    let result: DateValidCheck = 1; 
    // 0: pass(true) 1:invalid date(false) 2:past date(false)

    try {
      const now = new Date();
      const inputDate = new Date(dateComp);
      
      inputDate.toISOString();
      result = 0; // 0: pass(true)

      if(inputDate < now) {
        result = 2; // 2: past date(false)
      }
      
    } catch (e) {
      result = 1; // 1: invalid date(false)
      console.log(e);
    }

    return result;
  }
}




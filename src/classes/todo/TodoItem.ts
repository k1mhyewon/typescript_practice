export enum DateValidCheck {
  PASS, // 통과
  NODATE, // 유효하지 않은 날짜
  PASTDATE, // 지난 날짜
}


// TodoItem 클래스 - todo를 등록하고 검증하는 역할만 한다
export class TodoItem {
  constructor(
    public todoId: string,
    public category: string,
    public title: string,
    public duedate: number,
    public isDone: boolean
  ) {}

}

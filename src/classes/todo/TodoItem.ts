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

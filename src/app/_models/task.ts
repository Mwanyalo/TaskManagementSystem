export class Task {
  constructor(
    public title: string = null,
    public description: string = null,
    public status?: number,
    public id?: number,
    public startDate?: string,
    public endDate?: string
  ) {}
}

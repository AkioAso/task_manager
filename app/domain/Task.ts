export class Task {
  private readonly _name: string;
  private readonly _description: string;
  private readonly _deadline: string;
  private readonly _status: string;
  private readonly _finishedDay?: string;

  constructor(data: { name: string, description: string, deadline: string, status: string, finishedDay?: string }) {
    this._name = data.name;
    this._description = data.description;
    this._deadline = data.deadline;
    this._status = data.status;
    if (data.finishedDay) {
      this._finishedDay = data.finishedDay;
    }
  }

  get name(): string {
    return this._name;
  }
  get description(): string {
    return this._description;
  }
  get deadline(): string {
    return this._deadline;
  }
  get status(): string {
    return this._status;
  }
}
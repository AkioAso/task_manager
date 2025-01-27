export class Task {
  private readonly _name: string;
  private readonly _time: string;
  private readonly _status: boolean;

  constructor(data: { name: string, time: string, status: boolean }) {
    this._name = data.name;
    this._time = data.time;
    this._status = data.status;
  }

  get name(): string {
    return this._name;
  }
  get time(): string {
    return this._time;
  }
  get status(): boolean {
    return this._status;
  }
}
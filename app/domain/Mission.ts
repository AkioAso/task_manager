import { Task } from "./Task";

export class Mission {
  private readonly _id: string;
  private readonly _name: string;
  private readonly _description: string;
  private readonly _deadline: string;
  private readonly _isCompleted: boolean;
  private readonly _tasks: Task[];

  constructor(id: string, name: string, description: string, deadline: string, isCompleted: boolean, tasks: Task[]) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._deadline = deadline;
    this._isCompleted = isCompleted;
    this._tasks = tasks;
  }

  get id(): string {
    return this._id;
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
  get isCompleted(): boolean {
    return this._isCompleted;
  }
  get tasks(): Task[] {
    return this._tasks;
  }
}

export class MissionDigest {
  private readonly _id: string;
  private readonly _name: string;
  private readonly _deadline: string;
  private readonly _isCompleted: boolean;

  constructor(data: { id: string, name: string, deadline: string, isCompleted: boolean }) {
    this._id = data.id;
    this._name = data.name;
    this._deadline = data.deadline;
    this._isCompleted = data.isCompleted;
  }

  get id(): string {
    return this._id;
  }
  get name(): string {
    return this._name;
  }
  get deadline(): string {
    return this._deadline;
  }
  get isCompleted(): boolean {
    return this._isCompleted;
  }
}
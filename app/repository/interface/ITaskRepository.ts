import { Task } from "@/app/domain/Task";

export interface ITaskRepository {
  create(uid: string, date: string, tasks: Task[]): Promise<void>;
  fetch(uid: string, date: string): Promise<Task[]>;
  fetchAllSub(uid: string): Promise<Task[][]>;
  update(uid: string, date: string, tasks: Task[]): Promise<void>;
  delete(): void;
}
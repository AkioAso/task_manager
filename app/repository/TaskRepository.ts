import { Firestore } from "firebase/firestore";
import { PATH_NAME } from "./constant/firestore.constants";
import { ITaskRepository } from "./interface/ITaskRepository";

export class TaskRepository implements ITaskRepository {

  private readonly _db : Firestore;
  private readonly _collectionPath = PATH_NAME.TASK;

  constructor(db: Firestore) {
    this._db = db;
  }

  create(): void {
    console.log('TaskRepository.create');
  }
  read(): void {
    console.log('TaskRepository.read');
  }
  update(): void {
    console.log('TaskRepository.update');
  }
  delete(): void {
    console.log('TaskRepository.delete');
  }
}
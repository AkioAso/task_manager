import { Firestore} from "firebase/firestore";
import { IGoalRepository } from "./interface/IGoalRepository";
import { PATH_NAME } from "./constant/firestore.constants";

export class GoalRepository implements IGoalRepository {
  private readonly _db : Firestore;
  private readonly _collectionPath = PATH_NAME.GOAL;

  constructor(db: Firestore) {
    this._db = db;
  }
  read(): void {
    throw new Error("Method not implemented.");
  }
  update(): void {
    throw new Error("Method not implemented.");
  }
  delete(): void {
    throw new Error("Method not implemented.");
  }
  create(): void {
    throw new Error("Method not implemented.");
  }
}
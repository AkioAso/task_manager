import { doc, Firestore, setDoc } from "firebase/firestore";
import { IGoalRepository } from "./interface/IGoalRepository";
import { PATH_NAME } from "./constant/firestore.constants";
import { Goal } from "../domain/Goal";
import { firebaseConverter } from "./firestoreSchema/GoalCollection";
import { GoalMapper } from "./mapper/GoalMapper";

export class GoalRepository implements IGoalRepository {
  private readonly _db : Firestore;
  private readonly _collectionPath = PATH_NAME.GOAL;

  constructor(db: Firestore) {
    this._db = db;
  }
  async create(uid: string, goal: Goal ): Promise<void> {
    const docRef = doc(this._db, this._collectionPath, uid).withConverter(firebaseConverter);
    const createData = GoalMapper.toFirestore(goal);
    await setDoc(docRef, createData);
  }
  fetchOne(uid: string): void {
    console.log(uid);
    throw new Error("Method not implemented.");
  }
  update(): void {
    throw new Error("Method not implemented.");
  }
  delete(): void {
    throw new Error("Method not implemented.");
  }
}
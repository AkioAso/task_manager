import { doc, Firestore, getDoc, setDoc, updateDoc } from "firebase/firestore";
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
  async fetchOne(uid: string): Promise<Goal | null> {
    const docRef = doc(this._db, this._collectionPath, uid).withConverter(firebaseConverter);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = GoalMapper.toDomain(docSnap.data());
      return data;
    } else {
      return null;
    }
  }
  async update(uid: string, goal:Goal):  Promise<void> {
    const docRef = doc(this._db, this._collectionPath, uid).withConverter(firebaseConverter);
    const updateData = GoalMapper.toFirestore(goal);
    const firestoreData = firebaseConverter.toFirestore(updateData);  
    await updateDoc(docRef, firestoreData);
    return;
  }
  delete(): void {
    throw new Error("Method not implemented.");
  }
}
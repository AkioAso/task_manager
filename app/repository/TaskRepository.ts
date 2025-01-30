import { collection, doc, Firestore, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { PATH_NAME } from "./constant/firestore.constants";
import { ITaskRepository } from "./interface/ITaskRepository";
import { Task } from "../domain/Task";
import { TaskMapper } from "./mapper/TaskMapper";
import { firebaseConverter } from "./firestoreSchema/TaskCollection";

export class TaskRepository implements ITaskRepository {

  private readonly _db : Firestore;
  private readonly _collectionUserPath = PATH_NAME.USER;
  private readonly _collectionTaskPath = PATH_NAME.TASK;

  constructor(db: Firestore) {
    this._db = db;
  }

  async create(uid: string, date: string, tasks: Task[]): Promise<void> {
    const docRef = doc(this._db, this._collectionUserPath, uid, this._collectionTaskPath, date).withConverter(firebaseConverter);
    const createData = TaskMapper.toFirestore(tasks);
    await setDoc(docRef, createData);
    return;
  }
  async fetch(uid: string, date: string): Promise<Task[]> {
    const docRef = doc(this._db, this._collectionUserPath, uid, this._collectionTaskPath, date).withConverter(firebaseConverter);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = TaskMapper.toDomain(docSnap.data());
      return data;
    }
    return [];
  }
  async update(uid: string, date: string, tasks: Task[]): Promise<void> {
    const docRef = doc(this._db, this._collectionUserPath, uid, this._collectionTaskPath, date).withConverter(firebaseConverter);
    const updateData = TaskMapper.toFirestore(tasks);
    const firestoreData = firebaseConverter.toFirestore(updateData);  
    await updateDoc(docRef, firestoreData);
    return;
  }
  async fetchAllSub(uid: string): Promise<Task[][]> {
    const docRef = collection(this._db, this._collectionUserPath, uid, this._collectionTaskPath).withConverter(firebaseConverter);
    const docSnap = await getDocs(docRef);

    if (docSnap.empty) {
      return [];
    }
    const dacList = docSnap.docs.map((doc) => {
      const data = TaskMapper.toDomain(doc.data());
      const docId = doc.id;
      return data.map((task) => {
        return new Task({
          name: task.name,
          time: docId + ' ' + task.time + ':00',
          status: task.status
        });
      });
    });
    return dacList;
  }
  delete(): void {
    console.log('TaskRepository.delete');
  }
}
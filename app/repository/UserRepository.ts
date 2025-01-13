import { doc, Firestore, getDoc, setDoc } from "firebase/firestore";
import { IUserRepository } from "./interface/IUserRepository";
import { PATH_NAME } from "./constant/firestore.constants";
import { User } from "../domain/User";
import { firebaseConverter } from "./firestoreSchema/UserCollection";
import { UserMapper } from "./mapper/UserMapper";

export class UserRepository implements IUserRepository {

  private readonly _db : Firestore;
  private readonly _collectionPath = PATH_NAME.USER;

  constructor(db: Firestore) {
    this._db = db;
  }
  update(): void {
    throw new Error("Method not implemented.");
  }
  delete(): void {
    throw new Error("Method not implemented.");
  }
  
  async create(uid: string, data: User): Promise<void> {
    const docRef = doc(this._db, this._collectionPath, uid).withConverter(firebaseConverter);
    const createData = UserMapper.toFirestore(data);
    await setDoc(docRef, createData);
  }
  async fetchOne(uid: string): Promise<User> {
    const docRef = doc(this._db, this._collectionPath, uid).withConverter(firebaseConverter);
    const docSnapshot = await getDoc(docRef);
    if (!docSnapshot.exists()) {
      throw new Error('user data does not exist');
    }
    const data = docSnapshot.data();
    const user = UserMapper.toDomain(data);
    return user;
  }
}
import type { FirestoreDataConverter, SnapshotOptions, QueryDocumentSnapshot } from 'firebase/firestore';

export class UserCollection {
  private readonly _name: string;
  private readonly _birthday: string;
  private readonly _email: string;

  constructor(name: string, birthday: string, email: string) {
    this._name = name;
    this._birthday = birthday;
    this._email = email;
  }

  get name(): string {
    return this._name;
  }
  get birthday(): string {
    return this._birthday;
  }
  get email(): string {
    return this._email;
  }
}

export const firebaseConverter: FirestoreDataConverter<UserCollection> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toFirestore(user: UserCollection): any {
    return {
      name: user.name,
      birthday: user.birthday,
      email: user.email,
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot<UserCollection>,
    options: SnapshotOptions
  ): UserCollection {
    const data = snapshot.data(options);
    return new UserCollection(data.name, data.birthday, data.email);
  }
}
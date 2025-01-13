import { User } from "@/app/domain/User";
import { UserCollection } from "../firestoreSchema/UserCollection";

export class UserMapper {
  static toDomain(user: UserCollection
  ): User {
    return new User(user.name, user.birthday, user.email);
  }

  static toFirestore(user: User): UserCollection {
    return new UserCollection(user.name, user.birthday, user.email);
  }
}
import { User } from "@/app/domain/User";

export interface IUserRepository {
  create(uid: string, data: User): Promise<void>;
  fetchOne(uid: string): Promise<User>;
  update(): void;
  delete(): void;
}
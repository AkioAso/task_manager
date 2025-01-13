import { Goal } from "@/app/domain/Goal";

export interface IGoalRepository {
  create(uid: string, goal: Goal): void;
  fetchOne(uid: string): void;
  update(): void;
  delete(): void;
}
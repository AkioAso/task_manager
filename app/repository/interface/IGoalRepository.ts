import { Goal } from "@/app/domain/Goal";

export interface IGoalRepository {
  create(uid: string, goal: Goal): Promise<void>;
  fetchOne(uid: string): Promise<Goal | null>;
  update(): void;
  delete(): void;
}
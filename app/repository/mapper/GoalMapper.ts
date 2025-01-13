import { Goal } from "@/app/domain/Goal";
import { GoalCollection } from "../firestoreSchema/GoalCollection";

export class GoalMapper {
  static toFirestore(goal: Goal): GoalCollection {
    return new GoalCollection({
      id: goal.id,
      name: goal.name,
      description: goal.description,
      deadline: goal.deadline,
      userId: goal.userId,
      isCompleted: goal.isCompleted,
      missions: goal.missions
    });
  }
  static toDomain(goal: GoalCollection): Goal {
    return new Goal({
      id: goal.id,
      name: goal.name,
      description: goal.description,
      deadline: goal.deadline,
      userId: goal.userId,
      isCompleted: goal.isCompleted,
      missions: goal.missionDigests
    }
    );
  }
}
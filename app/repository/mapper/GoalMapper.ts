import { Goal } from "@/app/domain/Goal";
import { GoalCollection } from "../firestoreSchema/GoalCollection";

export class GoalMapper {
  static toFirestore(goal: Goal): GoalCollection {
    return new GoalCollection({
      id: goal.id,
      name: goal.name,
      description: goal.description,
      deadline: goal.deadline,
      isCompleted: goal.isCompleted,
      missionDigests: goal.missionDigests
    });
  }
  static toDomain(goal: GoalCollection): Goal {
    return new Goal({
      id: goal.id,
      name: goal.name,
      description: goal.description,
      deadline: goal.deadline,
      isCompleted: goal.isCompleted,
      missionDigests: goal.missionDigests
    }
    );
  }
}
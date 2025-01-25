import { MissionDigest } from "@/app/domain/Mission";
import { FirestoreDataConverter, SnapshotOptions, QueryDocumentSnapshot } from "firebase/firestore";

export class GoalCollection {
  private readonly _id: string;
  private readonly _name: string;
  private readonly _description: string;
  private readonly _deadline: string;
  private readonly _isCompleted: boolean;
  private readonly _missionDigests: MissionDigest[];

  constructor(data: { id: string, name: string, description: string, deadline: string, isCompleted: boolean, missions: MissionDigest[] }) {
    this._id = data.id;
    this._name = data.name;
    this._description = data.description;
    this._deadline = data.deadline;
    this._isCompleted = data.isCompleted;
    this._missionDigests = data.missions.map(mission => {
      return new MissionDigest({
        id: mission.id,
        name: mission.name,
        deadline: mission.deadline,
        isCompleted: mission.isCompleted
      });      
    });
  }

  get id(): string {
    return this._id;
  }
  get name(): string {
    return this._name;
  }
  get description(): string {
    return this._description;
  }
  get deadline(): string {
    return this._deadline;
  }
  get isCompleted(): boolean {
    return this._isCompleted;
  }
  get missionDigests(): MissionDigest[] {
    return this._missionDigests;
  }
}

export const firebaseConverter: FirestoreDataConverter<GoalCollection> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toFirestore(goal: GoalCollection): any {
    return {
      id: goal.id,
      name: goal.name,
      description: goal.description,
      deadline: goal.deadline,
      isCompleted: goal.isCompleted,
      missions: goal.missionDigests.map(mission => {
        return {
          id: mission.id,
          name: mission.name,
          deadline: mission.deadline,
          isCompleted: mission.isCompleted
        };
      })
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot<GoalCollection>,
    options: SnapshotOptions
  ): GoalCollection {
    const data = snapshot.data(options);
    return new GoalCollection({
      id: data.id,
      name: data.name,
      description: data.description,
      deadline: data.deadline,
      isCompleted: data.isCompleted,
      missions: data.missionDigests
    });
  }
}
import { Mission, MissionDigest } from "./Mission";

export class Goal {
  private readonly _id: string;
  private readonly _name: string;
  private readonly _description: string;
  private readonly _deadline: string;
  private readonly _isCompleted: boolean;
  private readonly _missionDigests: MissionDigest[];

  constructor(goal:{ id: string, name: string, description: string, deadline: string, isCompleted: boolean, missionDigests: Mission[] | MissionDigest[]}) {
    this._id = goal.id;
    this._name = goal.name;
    this._description = goal.description;
    this._deadline = goal.deadline;
    this._isCompleted = goal.isCompleted;
    this._missionDigests = goal.missionDigests.map(mission => {
      if (mission instanceof Mission) {
        return new MissionDigest(
          mission.id,
          mission.name,
          mission.deadline,
          mission.isCompleted
        );
      } else {
        return mission;
      }
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
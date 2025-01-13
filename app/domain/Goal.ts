import { Mission, MissionDigest } from "./Mission";

export class Goal {
  private readonly _id: string;
  private readonly _name: string;
  private readonly _description: string;
  private readonly _deadline: string;
  private readonly _userId: string;
  private readonly _isCompleted: boolean;
  private readonly _missions: MissionDigest[];

  constructor(goal:{ id: string, name: string, description: string, deadline: string, userId: string, isCompleted: boolean, missions: Mission[] | MissionDigest[]}) {
    this._id = goal.id;
    this._name = goal.name;
    this._description = goal.description;
    this._deadline = goal.deadline;
    this._userId = goal.userId;
    this._isCompleted = goal.isCompleted;
    this._missions = goal.missions.map(mission => {
      if (mission instanceof Mission) {
        return new MissionDigest({
          id: mission.id,
          name: mission.name,
          deadline: mission.deadline,
          isCompleted: mission.isCompleted
        });
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
  get userId(): string {
    return this._userId;
  }
  get isCompleted(): boolean {
    return this._isCompleted;
  }
  get missions(): MissionDigest[] {
    return this._missions;
  }
}
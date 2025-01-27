import { Task } from "@/app/domain/Task";
import { FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

export class TaskCollection {
  private readonly _tasks : Task[];

  constructor(tasks: Task[]) {
    this._tasks = tasks;
  }

  get tasks(): Task[] {
    return this._tasks;
  }
}

export const firebaseConverter: FirestoreDataConverter<TaskCollection> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toFirestore(taskCollection: TaskCollection): any {
    return {
      tasks: taskCollection.tasks.map(task => {
        return {
          name: task.name,
          time: task.time,
          status: task.status
        };
      })
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot<TaskCollection>, options: SnapshotOptions): TaskCollection {
    const data = snapshot.data(options);
    return new TaskCollection(data.tasks.map((task: { name: string, time: string, status: boolean }) => {
      return new Task(task);
    }));
  }
};
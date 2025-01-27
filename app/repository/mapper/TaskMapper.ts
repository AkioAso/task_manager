import { Task } from '@/app/domain/Task';
import { TaskCollection } from '../firestoreSchema/TaskCollection';

export class TaskMapper {
  static toFirestore(tasks: Task[]): TaskCollection {
    return new TaskCollection(tasks);
  }
  static toDomain(tasks: TaskCollection): Task[] {
    return tasks.tasks;
  }
}
import { db } from '@/firebaseConfig';
import { NextRequest, NextResponse } from 'next/server'; 
import { Task } from '@/app/domain/Task';
import { TaskRepository } from '@/app/repository/TaskRepository';
  
export async function POST(req: NextRequest) {
  try {
    const { uid, date, tasks } = await req.json();
    // @ts-expect-error: API仕様により型の不一致を許容 
    const taskList: Task[] = tasks.map(task => new Task({ ...task }));
    const taskRepository = new TaskRepository(db);

    const data = await taskRepository.fetch(uid, date);
    if (data.length > 0) {
      await taskRepository.update(uid, date, taskList);
      return NextResponse.json({ uid: uid }, { status: 200 });
    }

    await taskRepository.create(uid, date, taskList);
    return NextResponse.json({ uid: uid }, { status: 200 });

  } catch (e) {  
    console.error('Error during task creation: ', e);  
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });  
  }  
}  
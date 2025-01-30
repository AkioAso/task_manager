import { TaskRepository } from '@/app/repository/TaskRepository';
import { db } from '@/firebaseConfig';
import { NextRequest, NextResponse } from 'next/server';  
  
export async function GET(req: NextRequest) {  
  const { searchParams } = new URL(req.url);  
  const uid = searchParams.get('uid');

  if (!uid) {
    return NextResponse.json({ error: 'UID is required' }, { status: 400 });
  }
  
  const taskRepository = new TaskRepository(db);
  const tasks = await taskRepository.fetchAllSub(uid);
  if (tasks.length === 0) {  
    return NextResponse.json({}); 
  } 
  const taskList = tasks.flat(1);
  const data = taskList.map(task => {
    return {
      name: task.name,
      time: task.time,
      status: task.status
    }
  })
  console.log('data:', data);
  return NextResponse.json(data);
} 
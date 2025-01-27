import { TaskRepository } from '@/app/repository/TaskRepository';
import { db } from '@/firebaseConfig';
import { NextRequest, NextResponse } from 'next/server';  
  
export async function GET(req: NextRequest) {  
  const { searchParams } = new URL(req.url);  
  const uid = searchParams.get('uid');
  const date = searchParams.get('date');

  if (!date) {
    return NextResponse.json({ error: 'Date is required' }, { status: 400 });
  }
  if (!uid) {
    return NextResponse.json({ error: 'UID is required' }, { status: 400 });
  }
  
  const taskRepository = new TaskRepository(db);
  const tasks = await taskRepository.fetch(uid, date);
  if (!tasks) {  
    return NextResponse.json({}); 
  }
  const data = tasks.map(task => {
    return {
      name: task.name,
      time: task.time,
      status: task.status
    }
  })  
  return NextResponse.json(data);
} 
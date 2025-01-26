import { GoalRepository } from '@/app/repository/GoalRepository';
import { db } from '@/firebaseConfig';
import { NextRequest, NextResponse } from 'next/server';  
  
export async function GET(req: NextRequest) {  
  const { searchParams } = new URL(req.url);  
  const uid = searchParams.get('uid');  
  
  if (uid) {  
    const goalRepository = new GoalRepository(db);
    const goal = await goalRepository.fetchOne(uid);
    if (!goal) {  
      return NextResponse.json({});  
    }
    const data = { id: goal.id, name: goal.name, description: goal.description, deadline: goal.deadline, isCompleted: goal.isCompleted, missionDigests: goal.missionDigests };  
    return NextResponse.json(data);  
  } else {  
    return NextResponse.json({ error: 'UID is required' }, { status: 400 });  
  }  
} 
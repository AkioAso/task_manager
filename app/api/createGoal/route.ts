import { db } from '@/firebaseConfig';
import { GoalRepository } from '@/app/repository/GoalRepository';
import { NextRequest, NextResponse } from 'next/server';  
import { Goal } from '@/app/domain/Goal';
  
export async function POST(req: NextRequest) {
  try {
    const { id, name, description, deadline, isCompleted, missionDigests} = await req.json();  
    const newGoal = new Goal({ id, name, description, deadline, isCompleted, missionDigests });
    const goalRepository = new GoalRepository(db);

    await goalRepository.create(id, newGoal);
    return NextResponse.json({ id: id }, { status: 200 });

  } catch (e) {  
    console.error('Error during user creation: ', e);  
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });  
  }  
}  
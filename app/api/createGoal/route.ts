import { MissionDigest } from '@/app/domain/Mission';
import { db } from '@/firebaseConfig';
import { GoalRepository } from '@/app/repository/GoalRepository';
import { NextRequest, NextResponse } from 'next/server';  
import { Goal } from '@/app/domain/Goal';
  
export async function POST(req: NextRequest) {
  try {
    const { id, name, description, deadline, userId, isCompleted, missions} = await req.json();  

    const missionDigest = new MissionDigest(missions[0]);
    const newGoal = new Goal({id, name, description, deadline, userId, isCompleted, missions: [missionDigest] });
    const goalRepository = new GoalRepository(db);

    await goalRepository.create('sample', newGoal);
    return NextResponse.json({ id: 'sample' }, { status: 200 });

  } catch (e) {  
    console.error('Error during user creation: ', e);  
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });  
  }  
}  
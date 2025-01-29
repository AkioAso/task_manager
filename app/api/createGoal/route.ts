import { db } from '@/firebaseConfig';
import { GoalRepository } from '@/app/repository/GoalRepository';
import { NextRequest, NextResponse } from 'next/server';  
import { Goal } from '@/app/domain/Goal';
import { MissionDigest } from '@/app/domain/Mission';
  
export async function POST(req: NextRequest) {
  try {
    const { id, name, description, deadline, isCompleted, missionDigests } = await req.json();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sendedMissionDigests = missionDigests.map((missionDigest: any) => {
      return new MissionDigest(missionDigest.id, missionDigest.name, missionDigest.deadline, missionDigest.isCompleted);
    });
    const newGoal = new Goal({ id, name, description, deadline, isCompleted, missionDigests: sendedMissionDigests });
    const goalRepository = new GoalRepository(db);

    const prevGoal = await goalRepository.fetchOne(id);
    if (prevGoal) {
      goalRepository.update(id, newGoal);
    }
    await goalRepository.create(id, newGoal);
    return NextResponse.json({ id: id }, { status: 200 });

  } catch (e) {  
    console.error('Error during user creation: ', e);  
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });  
  }  
}  
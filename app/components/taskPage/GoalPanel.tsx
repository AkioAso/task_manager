'use client'
import { Goal } from '@/app/domain/Goal';
import React, { useEffect, useState } from 'react';  
import Timeline from './timeLine';
import { MissionDigest } from '@/app/domain/Mission';

type goalProps = {
  title: string;
  height: string;
  width: string;
  labelColor: string;
  buttonFunc: () => void;
}

const GoalPanel = (props: goalProps) => {
  const uid =  localStorage.getItem('uid');
  const [goal, setGoal] = useState<Goal | null>(null); 
  useEffect(() => {
    const fetchGoal = async () => {
      if (uid) {
        const url = `/api/fetchGoal?uid=${encodeURIComponent(uid)}`;
        console.log('url:', url);
        const res = await fetch(url,{  
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json',
          }
        });
        if (res.ok) {
          const resData = await res.json();
          console.log('resData:', resData);
          const goalInstance = new Goal({
            id: resData.id,
            name: resData.name,
            description: resData.description,
            deadline: resData.deadline,
            isCompleted: resData.isCompleted,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            missionDigests: resData.missionDigests.map((mission: any) => {
              return new MissionDigest(
                mission.id,
                mission.name,
                mission.deadline,
                mission.isCompleted,
              );
            })
          });
          setGoal(goalInstance);
        } else {
          if (res.status === 404) {
            console.log('Goal not found');
            return;
          }
          console.error('Failed to fetch document');
        }
      }
    };
    fetchGoal()
  }, [uid]);

  return (  
    <div className={`${props.width} m-2 border-solid border-2 border-black rounded-md overflow-hidden`}>  
      <div className={`${props.labelColor} flex justify-between items-center relative text-gray-800 h-10 p-2`}>  
        <h1>{props.title}</h1>  
        <button className="border-black bg-white rounded-md p-1" onClick={props.buttonFunc}>Add</button>  
      </div>  
      <section className="flex" style={{ height: 'calc(100% - 2.5rem)' }}>
        <div className='w-8/12 bg-green-500 flex-grow'>
          <Timeline goals={goal} />
        </div> 
        <div className="flex flex-col w-4/12 h-full">
          <div className="flex-1 bg-blue-500">{goal ? goal.id : 'Loading...'}</div>
          <div className="flex-1 bg-red-500">{goal ? goal.name : 'Loading...'}</div>
        </div>  
      </section>  
    </div>  
  );  
};

export default GoalPanel;

'use client'
import { Goal } from '@/app/domain/Goal';
import React, { useEffect, useState } from 'react';  
import Timeline from './timeLine';

type goalProps = {
  title: string;
  height: string;
  width: string;
  labelColor: string;
  buttonFunc: () => void;
}

const events = [
  {
    id: "1",
    name: "プロジェクト開始",
    details: "新規プロジェクトのキックオフミーティング",
    time: new Date(2023, 1, 15, 10, 0), // 2月15日 10:00
  }
];

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
          const goalInstance = new Goal(resData);
          setGoal(goalInstance);
        } else {
          console.error('Failed to fetch document');
        }
      }
    };
    fetchGoal()
  }, [uid]);


  // goalの変化を監視するuseEffect  
  useEffect(() => {  
    if (goal !== null) {  
      console.log('Document fetched:', goal);  
      console.log('goal.id:', goal.id);
      console.log('goal.name:', goal.name);
    }  
  }, [goal]); // goalが変化するたびにログを出力 

  return (  
    <div className={`${props.width} m-2 border-solid border-2 border-black rounded-md overflow-hidden`}>  
      <div className={`${props.labelColor} flex justify-between items-center relative text-gray-800 h-10 p-2`}>  
        <h1>{props.title}</h1>  
        <button className="border-black bg-white rounded-md p-1" onClick={props.buttonFunc}>Add</button>  
      </div>  
      <section className="flex" style={{ height: 'calc(100% - 2.5rem)' }}>
        <div className='w-8/12 bg-green-500 flex-grow'>
          <Timeline events={events} />
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

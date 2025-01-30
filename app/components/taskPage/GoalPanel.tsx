'use client'
import { Goal } from '@/app/domain/Goal';
import React, { useEffect, useState } from 'react';  
import Timeline from './timeLine';
import { MissionDigest } from '@/app/domain/Mission';
import AddTaskModal from './addTaskModal';

type goalProps = {
  title: string;
  height: string;
  width: string;
  labelColor: string;
}

export const dynamic = 'force-dynamic';

const GoalPanel = (props: goalProps) => {
  const uid =  localStorage.getItem('uid');
  const [goal, setGoal] = useState<Goal | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [missionNumber, setMissionNumber] = useState<number>(0);

  function buttonClick(): void {
    setShowModal(true);
  }

  function hoverMission(missionNumber: number): void {
    setMissionNumber(missionNumber);
    console.log('missionNumber:', missionNumber );
  }
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
    <>
      <AddTaskModal
        goal={goal}
        open={showModal}
        onCancel={() => setShowModal(false)}
        onOk={() => setShowModal(false)}/>
      <div className={`${props.width} m-2 border-solid border-2 border-black rounded-md overflow-hidden`}>  
        <div className={`${props.labelColor} flex justify-between items-center relative text-gray-800 h-10 p-2`}>  
          <h1>{props.title}</h1>  
          <button className="border-black bg-white rounded-md p-1" onClick={buttonClick}>Add</button>  
        </div>  
        <section className="flex" style={{ height: 'calc(100% - 2.5rem)' }}>
          <div className='w-8/12 bg-green-500 flex-grow'>
            <Timeline goals={goal} hoverMission={hoverMission}/>
          </div> 
          <div className="flex flex-col w-4/12 h-full">
            <div className="flex justify-between px-2 pt-2 pb-2 text-2xl">
              <div>
                目標: {goal?.missionDigests[missionNumber]?.name}
              </div>
            </div>
            <div className='px-2 pb-2 text-lg'>
              期限: {goal?.missionDigests[missionNumber]?.deadline}
            </div>
            <div className="ml-2 pb-2 text-lg" >
              進捗: {goal?.missionDigests[missionNumber]?.isCompleted ? "達成" : "未達成"}
            </div>
          </div>  
        </section>  
      </div>
    </>
  );  
};

export default GoalPanel;

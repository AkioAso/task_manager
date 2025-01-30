'use client'
import Calendar from '@/app/components/taskPage/calendar';
import ToDoTasks from '@/app/components/taskPage/toDoTasks';
import React from 'react';
import GoalPanel from '@/app/components/taskPage/GoalPanel';

const TaskPage: React.FC = () => {
  return (
    <>
      <div className="flex flex-col h-content">
        <section className='h-2/6 flex'>
          <GoalPanel title='Goals' height='h-2/6' width='w-full' labelColor='bg-red-400' />
        </section>
        <section className='h-4/6 flex'>
            <Calendar title='Calender' height='h-4/6' width='w-3/5' labelColor='bg-blue-400'/>
            <ToDoTasks title='ToDoTask' height='h-4/6' width='w-2/5' labelColor='bg-green-400'/>
        </section>
      </div>
    </>
  );
}

export default TaskPage;
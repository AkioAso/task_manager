'use client'

import AddTaskModal from '@/app/components/taskPage/addTaskModal';
import Calendar from '@/app/components/taskPage/calendar';
import ToDoTasks from '@/app/components/taskPage/toDoTasks';
import WidthGraph from '@/app/components/taskPage/widthGraph';
import React from 'react';

const TaskPage: React.FC = () => {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      <AddTaskModal 
        open={showModal}
        onCancel={() => setShowModal(false)}
        onOk={() => setShowModal(false)}/>

      <div className="flex flex-col h-content">
        <section className='h-2/6 m-2 border-solid border-2 border-black rounded-md p-2'>
          <WidthGraph />
        </section>
        <section className='h-4/6 flex'>
          <div className='w-3/5 m-2 border-solid border-2 border-black rounded-md p-2'>
            <Calendar />
          </div>
          <div className='w-2/5 m-2 border-solid border-2 border-black rounded-md p-2' >
            <ToDoTasks />
          </div>
        </section>
      </div>
    </>
  );
}

export default TaskPage;
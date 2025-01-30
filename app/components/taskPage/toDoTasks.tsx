'use client'

import type React from "react"
import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, Plus, Save } from "lucide-react"
import { Task } from "@/app/domain/Task"

type ToDoTasksProps = {
  title: string;
  height: string;
  width: string;
  labelColor: string;
}

const TaskComponent: React.FC<{ name: string; time: string }> = ({ name, time }) => {
  return (
    <li className="border-b border-gray-200 p-3 hover:bg-gray-50 transition-colors duration-150 ease-in-out">
      <div className="flex items-center">
        <p className="text-gray-600 tabular-nums w-20">{time}</p>
        <p className="text-gray-800 font-medium ml-4">{name}</p>
      </div>
    </li>
  )
}

const ToDoTasks = (props: ToDoTasksProps) => {
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTasks, setNewTasks] = useState<Task[]>([]);

  const uid = localStorage.getItem('uid');

  const fetchTasks = async (selectedDay: Date) => {
    if (uid) {
      const date = new Intl.DateTimeFormat("ja-JP", {
        year: "numeric",
        month: "2-digit",  // 2桁の数値にする  
        day: "2-digit"     // 2桁の数値にする  
      }).format(selectedDay).replace(/\//g, '-');
      const url = `/api/fetchTask?uid=${encodeURIComponent(uid)}&date=${date}`;
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (res.ok) {
        const resData = await res.json();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const tasksInstance = resData.map((task: any) => new Task(task));
        setTasks(tasksInstance);
      } else {
        console.error('Failed to fetch document');
      }
    }
  };

  useEffect(() => {
    fetchTasks(selectedDay)
  },[]);

  const formattedDate = new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",  // 2桁の数値にする  
    day: "2-digit"     // 2桁の数値にする  
  }).format(selectedDay).replace(/\//g, '-');


  const changeDate = (days: number) => {
    const newDate = new Date(selectedDay);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDay(newDate);
    fetchTasks(newDate);
  }

  const handleAddClick = () : void => {
    const newTask: Task = new Task({ name: "", time: "", status: false })
    setNewTasks([...newTasks, newTask]);
    return;
  };

  const handleSaveClick = async () => {
    const validNewTasks = newTasks.filter((task) => task.name && task.time);
    const updatedTasks = [...tasks, ...validNewTasks].sort((a, b) => {
      return a.time.localeCompare(b.time)
    });
    setTasks(updatedTasks);
    setNewTasks([]);
    await handleSubmit(updatedTasks);
  };

  const updateNewTask = (name: string, field: string, value: string) => {
    if (field === "time") {
      setNewTasks(newTasks.map((task) => (task.name === name ? new Task({ name: name, time: value, status: false }) : task)))
    } else {
      setNewTasks(newTasks.map((task) => (task.name === name ? new Task({ name: value, time: task.time, status: false }) : task)))
    }
  }

   const handleSubmit = async (updateData: Task[]) => {
     const date = new Intl.DateTimeFormat("ja-JP", {
       year: "numeric",
       month: "2-digit",  // 2桁の数値にする  
       day: "2-digit"     // 2桁の数値にする  
     }).format(selectedDay).replace(/\//g, '-');
  
     const sendData = {
       uid: uid,
       date: date,
       tasks: updateData.map((task) => {
         return {
           name: task.name,
           time: task.time,
           status: task.status
         }
       })
     };
      const res = await fetch('/api/createTask', {  
        method: 'POST',  
        headers: {  
          'Content-Type': 'application/json'  
        },  
        body: JSON.stringify(sendData)  
      });  
      if (!res.ok) {  
        console.error('Failed to add document');  
      }  
    };

  return (
    <div className={`${props.width} m-2 border-solid border-2 border-black rounded-md overflow-hidden flex flex-col`}>
      <div className={`${props.labelColor} flex justify-between items-center relative text-gray-800 h-10 p-2`}>
        <h1>{props.title}</h1>
        <div className="flex space-x-2">
          <button
            onClick={handleAddClick}
            className="bg-white text-gray-800 rounded-md px-3 py-1 text-sm font-medium shadow-sm hover:bg-gray-50 transition-colors duration-150 ease-in-out flex items-center"
          >
            <Plus size={16} className="mr-1" /> Add
          </button>
          <button
            onClick={handleSaveClick}
            className="bg-blue-500 text-white rounded-md px-3 py-1 text-sm font-medium shadow-sm hover:bg-blue-600 transition-colors duration-150 ease-in-out flex items-center"
          >
            <Save size={16} className="mr-1" /> Save
          </button>
        </div>
      </div>
      <section className="flex-1 overflow-hidden">
        <div className="p-4 text-gray-600 font-medium flex justify-between items-center">
          <button
            onClick={() => changeDate(-1)}
            className="p-1 rounded-full hover:bg-gray-200 transition-colors duration-150 ease-in-out"
            aria-label="前日"
          >
            <ChevronLeft size={20} />
          </button>
          <span>{formattedDate}</span>
          <button
            onClick={() => changeDate(1)}
            className="p-1 rounded-full hover:bg-gray-200 transition-colors duration-150 ease-in-out"
            aria-label="翌日"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        <ul className="overflow-y-auto max-h-[calc(100vh-200px)]">
          {tasks.map((task) => (
            <TaskComponent key={task.name} name={task.name} time={task.time} />
          ))}
          {newTasks.map((task,index) => (
            <li key={index} className="border-b border-gray-200 p-3">
              <div className="flex items-center">
                <input
                  type="time"
                  value={task.time}
                  onChange={(e) => updateNewTask(task.name, "time", e.target.value)}
                  className="text-gray-600 tabular-nums w-20 border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  value={task.name}
                  onChange={(e) => updateNewTask(task.name, "name", e.target.value)}
                  placeholder="新しいタスク"
                  className="text-gray-800 font-medium ml-4 flex-grow border-gray-300 rounded-md"
                />
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default ToDoTasks;
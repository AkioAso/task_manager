'use client'

import React, { useEffect } from "react";

const ToDoTasks: React.FC = () => {

  useEffect(() => {
    console.log("ToDoTasks");
  });

  return (
    <>
      <section className="flex relative text-gray-800" style={{ backgroundColor: "green" }}>
        <h1>ToDoTasks</h1>
        <button className=' absolute right-0'>Add</button>
      </section>
      <section className="flex relative text-gray-800" style={{ backgroundColor: "green" }}>
        
      </section>
    </>
  );
};

export default ToDoTasks;
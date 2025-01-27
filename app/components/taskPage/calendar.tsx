'use client'

import React from "react";
import { MyCalendar } from "./myCalender";

type CalenderProps = {
  title: string;
  height: string;
  width: string;
  labelColor: string;
}

const Calendar = (props: CalenderProps) => {
  return (
    <div className={`${props.width} m-2 border-solid border-2 border-black rounded-md overflow-hidden`}>
      <div className={`${props.labelColor} flex justify-between items-center relative text-gray-800 h-10 p-2`}>
        <h1>{props.title}</h1>
      </div>
      <div>
        <MyCalendar />
      </div>
    </div>
  );
};
export default Calendar;
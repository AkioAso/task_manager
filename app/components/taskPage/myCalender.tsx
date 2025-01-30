'use client'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import jaLocale from '@fullcalendar/core/locales/ja'
import { useEffect, useState } from 'react'

export const MyCalendar = () => {
  const uid = localStorage.getItem('uid');
  const url = uid ? `/api/fetchAllSubTask?uid=${encodeURIComponent(uid)}` : '';
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!uid) return;
      const res = await fetch(url,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      if (!res.ok) return;
      const resData = await res.json();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const eventList = resData.map((event: any) => {
        return {
          title: event.name,
          date: event.time,
        }
      });
      setEvents(eventList);
    }
    fetchEvent();
  }, [])
  return (
    <div  style={{ fontSize: '0.8em', maxWidth: '90%', overflow: 'hidden', justifyContent: 'center', margin: 'auto' }}>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        locales={[jaLocale]}
        locale="ja"
        aspectRatio={1.8}
        headerToolbar={{ left: 'title', center: 'month week day', right: 'prev today next' }}
        events={events}
        eventTimeFormat={{ hour: 'numeric', minute: '2-digit', omitZeroMinute: false, meridiem: 'narrow' }}
        eventContent={renderEventContent}
      />
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderEventContent(eventInfo: any) {
  return(
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import jaLocale from '@fullcalendar/core/locales/ja'

export const MyCalendar = () => {
  return (
    <div  style={{ fontSize: '0.8em', maxWidth: '90%', overflow: 'hidden', justifyContent: 'center', margin: 'auto' }}>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        locales={[jaLocale]}
        locale="ja"
        aspectRatio={1.8}
        headerToolbar={{ left: 'title', center: 'month week day', right: 'prev today next' }}
        events={[{ title: 'event 1', date: '2025-01-01 00:30:00' },
          { title: 'event 2', date: '2025-01-01 01:00:00' },
          { title: 'event 3', date: '2025-01-01' }
        ]}
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
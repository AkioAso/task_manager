import type React from "react"

interface TimelineEvent {
  id: string
  name: string
  details: string
  time: Date
}

interface TimelineProps {
  events: TimelineEvent[]
}

const Timeline: React.FC<TimelineProps> = ({ events }) => {
  const startDate = new Date(new Date().getFullYear(), 0, 1) // 今年の1月1日
  const endDate = new Date(new Date().getFullYear(), 11, 31) // 今年の12月31日

  const calculatePosition = (time: Date) => {
    const totalDays = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
    const daysPassed = (time.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
    return (daysPassed / totalDays) * 100
  }

  return (
    <div className="relative w-full h-full bg-gray-100">
      {/* 時間軸 */}
      <div className="absolute m-2 bottom-4 left-0 right-0 h-1 bg-gray-400">
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={index}
            className="absolute h-3 w-0.5 bg-gray-600"
            style={{ left: `${(index / 11) * 100}%`, bottom: "0" }}
          />
        ))}
      </div>

      {/* 月表示 */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between text-sm text-gray-600">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} style={{ left: `${(index / 11) * 100}%` }}>
            {new Date(0, index).toLocaleString("default", { month: "short" })}
          </div>
        ))}
      </div>

     {/* イベント吹き出し */}
     {events.map((event) => (
        <div
          key={event.id}
          className="bg-white rounded-lg shadow-md p-3 w-48 transform -translate-x-1/2"
          style={{
            left: `${calculatePosition(event.time)}%`,
            bottom: "40px", // 時間軸の上に配置
          }}
        >
          <div className="font-bold">{event.name}</div>
          <div className="text-sm text-gray-600">{event.details}</div>
          <div className="text-xs text-gray-500 mt-1">
            {event.time.toLocaleString("default", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
          {/* 三角形の矢印 */}
          <div className="absolute w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-white left-1/2 -translate-x-1/2 -bottom-2"></div>
        </div>
      ))}
    </div>
  )
}

export default Timeline


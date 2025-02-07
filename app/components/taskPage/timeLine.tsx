import { Goal } from "@/app/domain/Goal"
import Image from "next/image"
import type React from "react"

interface TimelineProps {
  goals: Goal | null
  hoverMission: (missionNumber: number) => void
}

const Timeline: React.FC<TimelineProps> = ({ goals, hoverMission }) => {
  const startDate = new Date(new Date().getFullYear(), 0, 1) // 今年の1月1日
  const endDate = new Date(new Date().getFullYear(), 11, 31) // 今年の12月31日
 
  const calculatePosition = (day: string) => {
    const time = new Date(day)
    const totalDays = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
    const daysPassed = (time.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
    return (daysPassed / totalDays) * 100
  }

  const calculateSubtraction = (day: string) => {
    const time = new Date(day)
    const totalDays = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
    const daysPassed = (time.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
    return (daysPassed / totalDays) * 16
  }

  return (
    <div className="relative w-full h-full bg-gray-100">
      <div className="absolute left-0 right-0 h-1" >
        <div className="flex justify-between px-2 pt-2 pb-2 text-2xl">
          <div>
            目標: {goals?.name}
          </div>
        </div>
        <div className="flex px-2 pb-2 text-lg">
          <div>
            期限: {goals?.deadline}
          </div>
          <div className="ml-2">
            進捗: {goals?.isCompleted ? "達成" : "未達成"}
          </div>
        </div>
        <div className="px-2 pb-2 text-lg">
          詳細: {goals?.description}
        </div>
      </div>
      {/* 時間軸 */}
      <div className="absolute m-2 bottom-4 left-0 right-0 h-1 bg-gray-400">
        {Array.from({ length: 13 }).map((_, index) => (
          <div
            key={index}
            className="absolute h-3 w-0.5 bg-gray-600"
            style={{ left: `${(index / 12) * 100}%`, bottom: "0" }}
          />
        ))}
      </div>

      {/* 月表示 */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between text-sm text-gray-600">
        {Array.from({ length: 13 }).map((_, index) => (
          <div key={index} style={{ left: `${(index / 12) * 100}%` }}>
            {new Date(0, index).toLocaleString("ja-JP", { month: "short" })}
          </div>
        ))}
      </div>
      {goals === null ? <></> :
        <div>
          {/* 小目標フラッグ */}
          {goals.missionDigests.map((mission, index) => (
            <div key={index} className="absolute bottom-8 w-[60px]"  style={{ left: `calc(${calculatePosition(mission.deadline) - 1}% - ${calculateSubtraction(mission.deadline)}px)`}}>
              <Image src={mission.isCompleted ? "/flag/yellowFlag.png" : "/flag/blueFlag.png"}  alt="flag" width={60} height={60} onMouseEnter={() => hoverMission(index)}/>
            </div>
          ))}

          {/* 目標フラッグ */}
          <div className="absolute bottom-8 w-[60px]" style={{ left: `calc(${calculatePosition(goals.deadline) - 1}% - ${calculateSubtraction(goals.deadline)}px)`}}>
            <Image src={goals.isCompleted ? "/flag/yellowFlag.png" : "/flag/redFlag.png"} alt="flag" width={60} height={60} />
          </div>

        </div>
      }
    </div>
  )
}

export default Timeline


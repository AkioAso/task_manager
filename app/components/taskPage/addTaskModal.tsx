'use client'

import { Goal } from '@/app/domain/Goal';
import { MissionDigest } from '@/app/domain/Mission';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export type ModalProps = {
  goal: Goal | null;
  open: boolean;
  onCancel: () => void;
  onOk: () => void;
};

interface FormData {
  name: string;
  description: string;
  deadline: string;
  isCompleted: boolean;
  missionDigests: MissionDigest[]
}

const TextField: React.FC<{ label: string, type: string, name: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ label, type, name, value, onChange }) => (  
  <div className="input-field">  
    <label>{label}:</label>  
    <input className="text-black bg-gray-100 w-4/5" type={type} name={name} value={value} onChange={onChange} />  
  </div>  
); 

const CheckboxField: React.FC<{ label: string, name: string, checked: boolean, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ label, name, checked, onChange }) => (
  <div className="input-field" key={name}>  
  <label>{label}:</label>  
  <input  
    className="text-black"  
    type="checkbox"  
    name={name}  
    checked={checked}  
    onChange={onChange}  
  />  
</div>  
);

const MissionComponent: React.FC<{
  mission: MissionDigest
  index: number
  onChange: (index: number, field: string, value: string | boolean) => void
}> = ({ mission, index, onChange }) => (
  <div className="p-2 border rounded mb-2">
    <TextField
      label="ミッション名"
      name={`missionName-${index}`}
      type="text"
      value={mission.name}
      onChange={(e) => onChange(index, "name", e.target.value)}
    />
    <TextField
      label="期限"
      name={`missionDeadline-${index}`}
      type="date"
      value={mission.deadline}
      onChange={(e) => onChange(index, "deadline", e.target.value)}
    />
    <CheckboxField
      label="完了"
      name={`missionIsCompleted-${index}`}
      checked={mission.isCompleted}
      onChange={(e) => onChange(index, "isCompleted", e.target.checked)}
    />
  </div>
  )

const AddTaskModal = (props: ModalProps) => {


  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    deadline: '',
    isCompleted: false,
    missionDigests: [],
  });

  useEffect(() => {
    if (props.goal) {
      setFormData({
        name: props.goal.name,
        description: props.goal.description,
        deadline: props.goal.deadline,
        isCompleted: props.goal.isCompleted,
        missionDigests: props.goal.missionDigests,
      });
    }
  },[props.goal])
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {  
    const { name, value, type, checked } = e.target;  
    setFormData(prev => ({  
      ...prev,  
      [name]: type === 'checkbox' ? checked : value  
    }));  
  };
  
  const addMission = () => {  
    const missionArray = new Set(formData.missionDigests);
    // 新しいMissionDigestを追加  
    missionArray.add(new MissionDigest( '', '', '', false ));  
    // Setを配列に変換  
    const newMissionArray = Array.from(missionArray);  
    setFormData((prev) => ({  
      ...prev,  
      missionDigests: newMissionArray,  
    }));  
  } 

  const handleMissionChange = (index: number, field: string, value: string | boolean) => {
    setFormData((prev) => {
      const newMissionDigests = prev.missionDigests.map((mission, i) => {
        if (i === index) {
          return new MissionDigest(
            mission.id,
            field === 'name' ? value as string : mission.name,
            field === 'deadline' ? value as string : mission.deadline,
            field === 'isCompleted' ? value as boolean : mission.isCompleted,
          );
        }
        return mission;
      });
      return {
        ...prev,
        missionDigests: newMissionDigests,
      };
    })
  }
  
  const handleSubmit = async () => {  

    const sendData = {
      id: uid,
      name: formData.name,
      description: formData.description,
      deadline: formData.deadline,
      isCompleted: formData.isCompleted,
      missionDigests: formData.missionDigests.map((mission, index) => {
        return {
          id: 'mission' + (index + 1).toString(),
          name: mission.name,
          deadline: mission.deadline,
          isCompleted: mission.isCompleted,
        }
      })
    }
    
    const res = await fetch('/api/createGoal', {  
      method: 'POST',  
      headers: {  
        'Content-Type': 'application/json'  
      },  
      body: JSON.stringify(sendData)  
    });
    if (!res.ok) {  
      console.error('Failed to add document');  
    }
    router.refresh();
  };

  const uid = localStorage.getItem('uid');

  return props.open ? (
    <>
      <div className="bg-white  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 p-5 flex flex-col items-start absolute z-20">
        <h1 className="text-xl font-bold mb-5">目標設定</h1>
        <div className="w-full">  
          <form onSubmit={handleSubmit}>
            <div>
              <h2>目標</h2>
              <div className='p-2'>
                <TextField
                  label="目標"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                />
                <TextField
                  label="詳細"
                  name="description"
                  type="text"
                  value={formData.description}
                  onChange={handleChange}
                />
                <TextField
                  label="達成期日"
                  name="deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={handleChange}
                />
                <CheckboxField
                  label="達成済み"
                  name="isCompleted"
                  checked={formData.isCompleted}
                  onChange={handleChange}
                />
              </div>
            <h2>ミッション</h2>
            <button type="button" onClick={addMission} className="bg-blue-500 text-white px-4 py-2 rounded mb-2">
              ミッション追加
            </button>
            {formData.missionDigests.map((mission, index) => (
              <MissionComponent
                key={index}
                mission={mission}
                index={index}
                onChange={handleMissionChange}
              />
            ))}
            </div>
            <div className="absolute bottom-4 flex mt-auto w-full">
              <button
                className="bg-slate-900 hover:bg-slate-700 text-white px-8 py-2 mx-auto"
                type='submit'>
                保存
              </button>
              <button
                className="bg-slate-900 hover:bg-slate-700 text-white px-8 py-2 mx-auto"
                onClick={() => props.onOk()}
              >
                キャンセル
              </button>
            </div>
          </form>
        </div>
      </div>
      <div
        className="fixed bg-black bg-opacity-50 w-full h-full z-10"
        onClick={() => props.onCancel()}
      ></div>
    </>
  ) : (
    <></>
  );
};

export default AddTaskModal;

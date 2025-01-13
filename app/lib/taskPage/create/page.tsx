'use client'  
import React, { useState } from 'react';  
  
interface FormData {  
  id: string;  
  name: string;  
  description: string;  
  deadline: string;  
  userId: string;  
  isCompleted: boolean;  
  missionId: string;  
  missionName: string;  
  missionDeadline: string;  
  missionIsCompleted: boolean;  
}

const InputField: React.FC<{ label: string, type: string, name: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ label, type, name, value, onChange }) => (  
  <div className="input-field">  
    <label>{label}:</label>  
    <input className="text-black" type={type} name={name} value={value} onChange={onChange} />  
  </div>  
); 
  
const CreateTaskPage: React.FC = () => {  
  const [formData, setFormData] = useState<FormData>({
    id: '',
    name: '',
    description: '',
    deadline: '',
    userId: '',
    isCompleted: false,
    missionId: '',
    missionName: '',
    missionDeadline: '',
    missionIsCompleted: false,
  });  
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {  
    const { name, value, type, checked } = e.target;  
    setFormData(prev => ({  
      ...prev,  
      [name]: type === 'checkbox' ? checked : value  
    }));  
  };  
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {  
    e.preventDefault();
    const sendData = {
      id: formData.id,
      name: formData.name,
      description: formData.description,
      deadline: formData.deadline,
      userId: formData.userId,
      isCompleted: formData.isCompleted,
      missions: [{
        id: formData.missionId,
        name: formData.missionName,
        deadline: formData.missionDeadline,
        isCompleted: formData.missionIsCompleted
      }]
    }
    const res = await fetch('/api/createGoal', {  
      method: 'POST',  
      headers: {  
        'Content-Type': 'application/json'  
      },  
      body: JSON.stringify(sendData)  
    });  
  
    if (res.ok) {  
      const data = await res.json();  
      console.log('Document added with ID:', data.id);  
    } else {  
      console.error('Failed to add document');  
    }  
  };
  console.log(formData);
  
  return (  
    <div className="create-user-container">  
      <form onSubmit={handleSubmit}>  
        <h1 className="create-user-title">Create User</h1>  
        {Object.keys(formData).map((key) => (  
          key === 'isCompleted' || key === 'missionIsCompleted' ? (  
            <div className="input-field" key={key}>  
              <label>{key}:</label>  
              <input  
                className="text-black"  
                type="checkbox"  
                name={key}  
                checked={formData[key as keyof FormData] as boolean}  
                onChange={handleChange}  
              />  
            </div>  
          ) : (  
            <InputField  
              key={key}  
              label={key}
              name={key}
              type="text"  
              value={formData[key as keyof FormData] as string}  
              onChange={handleChange}
            />  
          )  
        ))}  
        <button type="submit">Submit</button>  
      </form>  
    </div>  
  );  
};


  
export default CreateTaskPage;  
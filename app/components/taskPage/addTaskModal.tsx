'use client'

import React, { useState } from 'react';

export type ModalProps = {
  open: boolean;
  onCancel: () => void;
  onOk: () => void;
};

interface FormData {
  name: string;  
  description: string;  
  deadline: string;
  isCompleted: boolean;  
  missionId: string;  
  missionName: string;  
  missionDeadline: string;  
  missionIsCompleted: boolean;  
}

const TextField: React.FC<{ label: string, type: string, name: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ label, type, name, value, onChange }) => (  
  <div className="input-field">  
    <label>{label}:</label>  
    <input className="text-black bg-gray-100" type={type} name={name} value={value} onChange={onChange} />  
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

const AddTaskModal = (props: ModalProps) => {

  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    deadline: '',
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
      id: uid,
      name: formData.name,
      description: formData.description,
      deadline: formData.deadline,
      isCompleted: formData.isCompleted,
      missionDigests: [{
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

  const uid = localStorage.getItem('uid');

  return props.open ? (
    <>
      <div className="bg-white  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 p-5 flex flex-col items-start absolute z-20">
        <h1 className="text-xl font-bold mb-5">Title</h1>
        <div className="create-user-container">  
          <form onSubmit={handleSubmit}>  
            <h1 className="create-user-title">Create User</h1>  
            <div>
              <h1>uid: {uid}</h1>
            </div>
            <TextField
              label="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              label="description"
              name="description"
              type="text"
              value={formData.description}
              onChange={handleChange}
            />
            <TextField
              label="deadline"
              name="deadline"
              type="date"
              value={formData.deadline}
              onChange={handleChange}
            />
            <CheckboxField
              label="isCompleted"
              name="isCompleted"
              checked={formData.isCompleted}
              onChange={handleChange}
            />
            <TextField
              label="missionId"
              name="missionId"
              type="text"
              value={formData.missionId}
              onChange={handleChange}
            />
            <TextField
              label="missionName"
              name="missionName"
              type="text"
              value={formData.missionName}
              onChange={handleChange}
            />
            <TextField
              label="missionDeadline"
              name="missionDeadline"
              type="date"
              value={formData.missionDeadline}
              onChange={handleChange}
            />
            <CheckboxField
              label="missionIsCompleted"
              name="missionIsCompleted"
              checked={formData.missionIsCompleted}
              onChange={handleChange}
            />
            <button type="submit">Submit</button>  
          </form>  
        </div>  
        
        <div className="flex mt-auto w-full">
          <button
            className="bg-slate-900 hover:bg-slate-700 text-white px-8 py-2 mx-auto"
            onClick={() => props.onOk()}
          >
            OK
          </button>
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

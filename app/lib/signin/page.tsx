'use client'

import { useState } from 'react';
  
export default function Signin() {  
  const [name, setName] = useState('');  
  const [age, setAge] = useState('');  
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {  
    e.preventDefault();  
  
    const res = await fetch('/api/addUser', {  
      method: 'POST',  
      headers: {  
        'Content-Type': 'application/json'  
      },  
      body: JSON.stringify({ name, age })  
    });  
  
    if (res.ok) {  
      const data = await res.json();  
      console.log('Document added with ID:', data.id);  
    } else {  
      console.log(res);
      console.error('Failed to add document');  
    }  
  };  
  
  return (  
    <div>
      <h1>Add User</h1>
      <form onSubmit={handleSubmit}>
        <div className='text-blue-500'>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className='text-blue-500'>
          <label>Age:</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>  
  );  
}  
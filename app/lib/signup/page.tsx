'use client'

import { CSSProperties, useState } from 'react';
  
const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {  
    e.preventDefault();  
  
    const res = await fetch('/api/createAuth', {  
      method: 'POST',  
      headers: {  
        'Content-Type': 'application/json'  
      },  
      body: JSON.stringify({ email, password })  
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
    <div style={createUserContainer}>
      <form onSubmit={handleSubmit} className='text-white'>
        <h1 className='create-user-title'>Create User</h1>
        <div style={inputStyle}>
          <label>name:</label>
          <input className='text-black' type="string" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div style={inputStyle}>
          <label>birthday:</label>
          <input className='text-black' type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
        </div>
        <div style={inputStyle}>
          <label>email:</label>
          <input className='text-black' type="string" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div style={inputStyle}>
          <label>password:</label>
          <input className='text-black' type="string" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>  
  );  
}

const createUserContainer: CSSProperties = {
  padding: '20px',
  margin: '20px',
  display: 'flex',
};

const inputStyle: CSSProperties = {
  margin: '10px',
};

export default Signup;
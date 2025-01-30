'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
  
const SignIn : React.FC = () => {  
  const [email, setEmail] = useState('');  
  const [password, setPassword] = useState('');  
  const router = useRouter();
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {  
    e.preventDefault();  
  
    const res = await fetch('/api/signIn', {  
      method: 'POST',  
      headers: {  
        'Content-Type': 'application/json'  
      },  
      body: JSON.stringify({ email, password })  
    }); 
  
    if (res.ok) {  
      const data = await res.json();  

      localStorage.setItem('uid', data.uid);
      localStorage.setItem('idToken', data.idToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      router.push('/lib/taskPage');

    } else {  
      console.error('Failed to signIn');  
    }  
  };
  
  return (  
    <div>
      <h1>Sign in</h1>
      <form onSubmit={handleSubmit}>
        <div className='text-blue-500'>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className='text-blue-500'>
          <label>Password:</label>
          <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>  
  );  
}  

export default SignIn;
 'use client'

import React from 'react';  
import { CSSProperties } from 'react';
import { useRouter } from 'next/navigation';
  
const Header: React.FC = () => {
  const router = useRouter();
  const handleSignin = () => {
    router.push('/lib/signIn');
  }
  const handleSignup = () => {
    router.push('/lib/signUp');
  }
  return (  
    <header style={headerStyle}>  
      <div style={titleStyle}>Task Manager</div>
      <div style={{display: 'flex'}}>
        <button style={buttonStyle} onClick={handleSignup}>Sign Up</button>
        <button style={buttonStyle} onClick={handleSignin}>Sign In</button>  
      </div>
    </header>  
  );  
};  
  
const headerStyle: CSSProperties = {  
  display: 'flex',  
  justifyContent: 'space-between',  
  alignItems: 'center',  
  padding: '10px 20px',  
  backgroundColor: 'blue',  
  position: 'fixed', // ヘッダーを固定する  
  top: 0,  
  left: 0,  
  right: 0,  
  height: '50px',  
  zIndex: 1000, // 他の要素の上に表示するためのz-index  
};  
  
const titleStyle: CSSProperties = {  
  color: 'white',  
  fontSize: '24px',  
  fontWeight: 'bold',  
};  
  
const buttonStyle: CSSProperties = {  
  padding: '8px 16px',
  margin: '0px 0px 0px 10px',
  backgroundColor: 'white',  
  color: 'blue',  
  border: 'none',  
  borderRadius: '5px',  
  cursor: 'pointer',  
};  
  
export default Header;  
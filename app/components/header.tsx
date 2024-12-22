// components/Header.tsx  
import React from 'react';  
import { CSSProperties } from 'react';  
  
const Header: React.FC = () => {  
  return (  
    <header style={headerStyle}>  
      <div style={titleStyle}>Task Manager</div>  
      <button style={buttonStyle}>Log In</button>  
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
  padding: '10px 20px',  
  backgroundColor: 'white',  
  color: 'blue',  
  border: 'none',  
  borderRadius: '5px',  
  cursor: 'pointer',  
};  
  
export default Header;  
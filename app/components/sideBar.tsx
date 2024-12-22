// components/Sidebar.tsx  
import React from 'react';  
import { CSSProperties } from 'react';  
  
const Sidebar: React.FC = () => {  
  return (  
    <aside style={sidebarStyle}>  
      <nav className="text-black">  
        <ul>  
          <li>  
            <a>Link 1</a>  
          </li>  
          <li>  
            <a>Link 2</a>  
          </li>  
          <li>  
            <a>Link 3</a>  
          </li>  
        </ul>  
      </nav>  
    </aside>  
  );  
};  
  
const sidebarStyle: CSSProperties = {  
  width: '200px',  
  background: '#f0f0f0',  
  padding: '20px',  
  height: 'calc(100vh - 50px)', // ヘッダーの高さを考慮  
  position: 'fixed',  
  top: '50px', // ヘッダーの高さ分だけ下にずらす  
  left: 0,  
  overflowY: 'auto',  
};  
  
export default Sidebar;  
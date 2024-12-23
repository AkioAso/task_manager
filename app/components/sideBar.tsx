'use client'

// components/Sidebar.tsx  
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';  
import { CSSProperties } from 'react';

const links = [
  { name: 'taskPage', href: '/lib/taskPage' },
  { name: 'contentsA', href: '/lib/taskPage/contentsA' },
  {
    name: 'contentsB',
    href: '/lib/taskPage/contentsB',
  },
];
  
const Sidebar: React.FC = () => { 
  const pathname = usePathname();
  return (  
    <aside style={sidebarStyle}>  
      <nav className="text-black">  
        {links.map((link) => {
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
                {
                  'bg-sky-100 text-blue-600': pathname === link.href,
                },
              )}
            >
              <p className="hidden md:block">{link.name}</p>
            </Link>
          );
        })}
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
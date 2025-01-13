import Sidebar from "@/app/components/sideBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 50px)' }}>  
      <Sidebar />  
      <div style={{ marginLeft: '200px', width: 'calc(100vw - 200px)', height: 'calc(100vh - 50px)', position: 'fixed' }}>  
        {children}  
      </div>  
    </div> 
  );
}

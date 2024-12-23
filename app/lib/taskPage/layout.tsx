import Sidebar from "@/app/components/sideBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div style={{ display: 'flex'}}>  
      <Sidebar />  
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto',  marginLeft: '200px'}}>  
        {children}  
      </div>  
    </div> 
  );
}

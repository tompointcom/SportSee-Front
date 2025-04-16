import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import '../styles/Layout.css';
import '../styles/Sidebar.css'; 

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="app">
      <Header />
      <div className="main-container">
        <Sidebar />
        <main className="content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
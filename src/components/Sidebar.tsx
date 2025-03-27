import React from 'react';
import '../styles/Sidebar.css';
import meditation from '../assets/icons/icon1.png';
import swimming from '../assets/icons/icon2.png';
import cycling from '../assets/icons/icon3.png';
import bodybuilding from '../assets/icons/icon4.png';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-icons">
        <div className="icon-container">
          <img src={meditation} alt="Meditation" draggable="false" />
        </div>
        <div className="icon-container">
          <img src={swimming} alt="Swimming" draggable="false" />
        </div>
        <div className="icon-container">
          <img src={cycling} alt="Cycling" draggable="false" />
        </div>
        <div className="icon-container">
          <img src={bodybuilding} alt="Bodybuilding" draggable="false" />
        </div>
      </div>
      <div className="copyright">
        <p>Copyright, SportSee 2020</p>
      </div>
    </div>
  );
};

export default Sidebar;
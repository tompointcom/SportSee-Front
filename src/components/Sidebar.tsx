/**
 * @fileoverview Composant de barre latérale affichant les icônes de navigation des activités sportives.
 * Cette barre latérale est présente sur toutes les pages de l'application et contient
 * des icônes pour différentes activités physiques ainsi qu'un copyright.
 */

import React from 'react';
import '../styles/Sidebar.css';
import meditation from '../assets/icons/icon1.png';
import swimming from '../assets/icons/icon2.png';
import cycling from '../assets/icons/icon3.png';
import bodybuilding from '../assets/icons/icon4.png';

/**
 * Composant affichant la barre latérale avec des icônes d'activités sportives
 * 
 * @component
 * @returns {JSX.Element} Barre latérale avec icônes et copyright
 */
const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      {/* Section des icônes d'activités sportives */}
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
      
      {/* Section du copyright */}
      <div className="copyright">
        <p>Copyright, SportSee 2020</p>
      </div>
    </div>
  );
};

export default Sidebar;
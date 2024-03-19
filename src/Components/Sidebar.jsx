import React from 'react';
import "../App.css";
import { SidebarData } from './SidebarData';

function Sidebar () {
  return (
    <div className='sidebar'>
        <ul className='sidebarlist'>
          {SidebarData.map((val,key) => {
            return (
              <li className='navlist' key={key} onClick={() => {window.location.pathname = val.link}}
                id={window.location.pathname === val.link ? "active" : "" }>
                  
                {" "}
                <div id='icon'>{val.icon}</div>{" "}
                <div id='title'>{val.title}</div>{" "}

              </li>
            );
          })}
        </ul>
    </div>
  )
}

export default Sidebar;

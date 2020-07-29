import React from 'react';
import './Sidebar.css';


const sidebar = (props) => {
    let sidebarClasses = 'sidebar';
    if(props.show){
        sidebarClasses = 'sidebar open';
    }
    return(
        <nav className={sidebarClasses}>
            <ul>
                {/*<li >{props.myInput}</li>*/}
                <li ><a href="/">
                    Overview</a></li>
                <li ><a href="/">
                    Graph Overview</a></li>
                <li ><a href="/">
                    Data Export</a></li>
            </ul>
        </nav>
    );

};

export default sidebar;
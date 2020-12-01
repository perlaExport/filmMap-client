import React, { useState } from 'react';
import "./Sidebar.scss";
import {ReactComponent as Arrow} from "assets/images/double-arrow.svg";

interface SidebarProps {
    show: boolean,
    title: string
}

const Sidebar: React.FC<SidebarProps> = ({children, show, title}) => {

    const [showState, setShowState] = useState(true);

    const toggleSidebardShow = () => {
        setShowState( show => !show);
    }

    return (
        <aside className={`side-bar ${showState ? "show" : ""}`}>
            <div className="sidebar-header">
                <Arrow onClick={toggleSidebardShow} className="arrow-icon" />
                <h2 className="sidebar-title">{title}</h2>
            </div>
            <div className="sidebar-content">
                {children}
            </div>
        </aside>
    )
}

export default Sidebar

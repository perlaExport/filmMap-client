import React from "react";
import "./Sidebar.scss";
import { ReactComponent as Arrow } from "assets/images/double-arrow.svg";
import Backdrop from "../Backdrop/Backdrop";

interface SidebarProps {
  show: boolean;
  closeHandler: () => void;
  title: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  children,
  show,
  closeHandler,
  title,
}) => {
  return (
    <div className="sidebar-wrapper">
      <aside className={`side-bar ${show ? "show" : ""}`}>
        <div className="sidebar-header">
          <Arrow onClick={closeHandler} className="arrow-icon" />
          <h2 className="sidebar-title">{title}</h2>
        </div>
        <div className="sidebar-content">{children}</div>
      </aside>
      <Backdrop show={show} clicked={closeHandler} />
    </div>
  );
};

export default Sidebar;

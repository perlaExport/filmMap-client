import Sidebar from "./Sidebar";

export interface SidebarProps {
  show: boolean;
  closeHandler: () => void;
  title: string;
}

export default Sidebar;

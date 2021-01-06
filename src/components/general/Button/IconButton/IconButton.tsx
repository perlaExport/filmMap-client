import React from "react";
import "./IconButton.scss";
import { IconButtonProps } from "../";

const IconButton: React.FC<IconButtonProps> = ({ classes, icon, ...props }) => {
  return (
    <button {...props} className={`icon-button btn-primary ${classes || ""}`}>
      <span className="button-icon">{icon}</span>
      <span className="button-name">{props.children}</span>
    </button>
  );
};

export default IconButton;

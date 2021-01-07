import React from "react";
import "./LoadingButton.scss";
import { LoadingButtonProps } from "../";
import { ReactComponent as DualRingSpinner } from "assets/spinners/DualRing-black.svg";

const LoaingButton: React.FC<LoadingButtonProps> = ({
  children,
  classes = "",
  isLoading,
  ...props
}) => {
  return (
    <button
      {...props}
      disabled={props.disabled || isLoading}
      className={`loading-btn btn-primary submit-btn ${classes} ${isLoading ? "loading" : ""}`}>
      <span>{children}</span>
      <DualRingSpinner />
    </button>
  );
};

export default LoaingButton;

import React from "react";
import "./Input.scss";
import { InputProps } from "./";

const Input: React.FC<InputProps> = ({ classes, error, label, ...props }) => {
  const inputClasses = () => {
    let allClasses = "input-wrapper ";
    allClasses += `${classes} ` || "";
    allClasses += !!props.value ? "active " : "";
    allClasses += !!error ? "error " : "";
    return allClasses;
  };

  return (
    <div className={inputClasses()}>
      <input {...props} />
      <label>{label || props.name}</label>
      <span className="error-text">{error}</span>
    </div>
  );
};

export default Input;

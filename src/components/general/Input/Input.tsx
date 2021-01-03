import React from 'react';
import "./Input.scss";
import { InputProps } from "./IInput";

const Input: React.FC<InputProps> = ({ classes, error, label, ...props }) => {
    return (
        <div className={`input-wrapper ${classes || ""} ${!!props.value ? "active" : ""} ${!!error ? "error" : ""}`}>
            <input {...props} />
            <label>{label || props.name}</label>
            <span className="error-text">{error}</span>
        </div>
    )
}

export default Input

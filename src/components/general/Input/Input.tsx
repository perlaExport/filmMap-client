import React from 'react';
import "./Input.scss";

interface InputProps extends React.ComponentProps<"input">{
    classes?: string,
    label?: string,
    error?: string | null,
}

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

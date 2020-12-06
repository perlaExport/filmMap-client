import React from 'react';
import "./Input.scss";

interface InputProps {
    classes?: string,
    type?: string,
    label?: string,
    name: string,
    value: string | number | undefined,
    error?: string | null, 
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void | undefined
}

const Input: React.FC<InputProps> = ({ classes, type="text", name, label=name, value, error, onChange }) => {
    return (
        <div className={`input-wrapper ${classes || ""} ${!!value ? "active" : ""} ${!!error ? "error" : ""}`}>
            <input type={type} name={name} value={value} onChange={onChange} />
            <label>{label}</label>
            <span className="error-text">{error}</span>
        </div>
    )
}

export default Input

import React from "react";
import "./Button.scss";

interface ButtonProps {
    className?: String
}

const Button: React.FC<ButtonProps> = ({ children, className}) => {
    return (
        <div className={`app-button ${className}`}>
            {children}
        </div>
    )
}

export default Button

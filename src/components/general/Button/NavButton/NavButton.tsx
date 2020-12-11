import React from "react";
import "./NavButton.scss";

interface NavButtonProps {
    className?: String
}

const NavButton: React.FC<NavButtonProps> = ({ children, className}) => {
    return (
        <div className={`app-button ${className}`}>
            {children}
        </div>
    )
}

export default NavButton

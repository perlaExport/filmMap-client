import React from 'react';
import {ReactComponent as DualRingSpinner} from "assets/spinners/DualRing-black.svg";
import "./LoadingButton.scss";

interface LoadingButtonProps {
    classes?: string,
    type?: "button" | "submit" | "reset",
    clicked?: () => void,
    isLoading: boolean 
}

const LoaingButton: React.FC<LoadingButtonProps> = ({ children, classes="", type="button", clicked, isLoading }) => {
    return (
        <button 
            disabled={isLoading}
            className={`loading-btn btn-primary submit-btn ${classes} ${isLoading ? "loading" : ""}`}
            type={type}
            onClick={clicked}
        >
            <span>{children}</span>
            <DualRingSpinner />
        </button>
    )
}

export default LoaingButton

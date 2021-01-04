import React from 'react';
import "./Backdrop.scss";
import { BackdropProps } from "./IBackdrop";

const Backdrop: React.FC<BackdropProps> = ({ clicked, show }) => {
    return (
        <div
            onClick={clicked}
            role="presentation"
            className={`backdrop ${ show ? "open" : ""}`}
        ></div>
    )
}

export default Backdrop

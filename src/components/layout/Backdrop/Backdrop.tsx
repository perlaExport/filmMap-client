import React from 'react';
import "./Backdrop.scss";

interface BackdropProps {
    clicked: () => void,
    show: boolean
}

const Backdrop: React.FC<BackdropProps> = ({clicked, show}) => {
    return (
        <div
            onClick={clicked}
            role="presentation"
            className={`backdrop ${ show ? "open" : ""}`}
        ></div>
    )
}

export default Backdrop

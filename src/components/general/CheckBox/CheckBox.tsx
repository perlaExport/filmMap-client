import React from 'react';
import "./CheckBox.scss";

interface CheckBoxProps extends React.ComponentProps<"input"> {
    label?: string 
}

const CheckBox: React.FC<CheckBoxProps> = ({label, ...props}) => {
    return (
    <div className="checkbox-container">
        <input {...props} type="checkbox" />
        {/* <span className="checkmark"></span> */}
        <label className="checkmark-label">{label}</label>
    </div>);
}

export default CheckBox;

import React from 'react';

interface CheckBoxProps extends React.ComponentProps<"input"> {
    label?: string 
}

const CheckBox: React.FC<CheckBoxProps> = ({label, ...props}) => {
    return (
    <div className="container">
        <input {...props} type="checkbox" />
        {/* <span className="checkmark"></span> */}
        <label className="checkmark">{label}</label>
    </div>);
}

export default CheckBox;

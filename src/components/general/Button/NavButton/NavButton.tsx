import React from "react";
import "./NavButton.scss";
import {ReactComponent as LogInIcon } from "assets/images/login-icon.svg";
import {ReactComponent as UserIcon } from "assets/images/user-icon.svg";

interface NavButtonProps extends React.ComponentProps<"button"> {
    classes?: string,
    username?: string
}

const NavButton: React.FC<NavButtonProps> = ({ classes, username, ...props}) => {


    return (
        <button {...props} className={`app-button ${classes}`}>
            {
                !!username ?
                <>
                    <UserIcon />
                    <span>{username}</span>
                </> :
                <>
                    <LogInIcon />
                    <span>LogIn</span>
                </>
            }
         
        </button>
    )
}

export default NavButton

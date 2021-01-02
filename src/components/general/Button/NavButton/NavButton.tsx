import React from "react";
import "./NavButton.scss";
import IconButton from "../IconButton/IconButton";
import {ReactComponent as LogInIcon } from "assets/images/login-icon.svg";
import {ReactComponent as UserIcon } from "assets/images/user-icon.svg";

interface NavButtonProps extends React.ComponentProps<"button"> {
    classes?: string,
    username?: string
}

const NavButton: React.FC<NavButtonProps> = ({ username, classes, ...props}) => {
    if(!!username)
        return <IconButton {...props} classes={`app-button ${classes}`} icon={<UserIcon />}>{username}</IconButton>
    else
        return <IconButton {...props} classes={`app-button ${classes}`} icon={<LogInIcon />}>LogIn</IconButton>
}

export default NavButton

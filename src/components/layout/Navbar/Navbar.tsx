import React from 'react';
import "./Navbar.scss";
import { ReactComponent as Logo } from "assets/images/filmMap-logo-full.svg";
import { ReactComponent as UserIcon } from "assets/images/user-icon.svg";
import Button from "components/general/Button/Button";

interface NavbarProps {
    username: string | undefined
}

const Navbar: React.FC<NavbarProps> = ({ username }) => {
    return (
        <nav id="navbar">
            <Logo className="app-logo" />
            { !!username 
            ? <Button className="user-button"><UserIcon />{username}</Button> 
            : <Button className="log-in-button">logIn</Button> }
            
        </nav>
    )
}

export default Navbar

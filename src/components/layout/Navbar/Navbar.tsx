import React from 'react';
import "./Navbar.scss";
import { ReactComponent as Logo } from "assets/images/filmMap-logo-full.svg";
import { ReactComponent as UserIcon } from "assets/images/user-icon.svg";
import Button from "components/general/Button/Button";
import { Sidebar } from "components/layout"

interface NavbarProps {
    username: string | undefined
}

const Navbar: React.FC<NavbarProps> = ({ username }) => {
    return (
        <>
            <nav id="navbar">
                <Logo className="app-logo" />
                { !!username 
                ? <Button className="user-button"><UserIcon />{username}</Button> 
                : <Button className="log-in-button">logIn</Button> }
                
            </nav>
            <Sidebar show={true} title="Login">
                <input type="text"/>
                <input type="text"/>
                <button>submit</button>
            </Sidebar>
        </>
    )
}

export default Navbar

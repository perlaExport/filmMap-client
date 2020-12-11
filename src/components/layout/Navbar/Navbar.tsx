import React, { useState } from 'react';
import "./Navbar.scss";
import { ReactComponent as Logo } from "assets/images/filmMap-logo-full.svg";
import { ReactComponent as UserIcon } from "assets/images/user-icon.svg";
import { NavButton } from "components/general/Button";
import { Sidebar } from "components/layout"
import { RegisterForm, LoginForm } from "components/forms";

interface NavbarProps {
    username: string | undefined
}

const Navbar: React.FC<NavbarProps> = ({ username }) => {

    const [sidebarShow, setSidebarShow] = useState<boolean>(true);
    const [currentSidebarForm, setSidebarForms] = useState<"Login" | "Register">("Login");

    const handleToggleSidebarOpen = () => {
        setSidebarShow( isOpen => !isOpen);
    }

    const changeToRegister = () => {
        setSidebarShow(false);
        setTimeout(() => {
            setSidebarForms("Register");
            setSidebarShow(true);
        }, 700);
    }
    const changeToLogin = () => {
        setSidebarShow(false);
        setTimeout(() => {
            setSidebarForms("Login");
            setSidebarShow(true);
        }, 700);
    }

    return (
        <>
            <nav id="navbar">
                <Logo className="app-logo" />
                { !!username 
                ? <NavButton className="user-button"><UserIcon />{username}</NavButton> 
                : <NavButton className="log-in-button">logIn</NavButton> }
                
            </nav>
            <Sidebar show={sidebarShow} closeHandler={handleToggleSidebarOpen} title={currentSidebarForm}>
                {currentSidebarForm === "Login" && <LoginForm changeFormScene={changeToRegister} />}
                {currentSidebarForm === "Register" && <RegisterForm changeFormScene={changeToLogin} />}
            </Sidebar>
        </>
    )
}

export default Navbar

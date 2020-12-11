import React, { useState } from 'react';
import "./Navbar.scss";
import { ReactComponent as Logo } from "assets/images/filmMap-logo-full.svg";
import { NavButton } from "components/general/Button";
import { Sidebar } from "components/layout"
import { RegisterForm, LoginForm } from "components/forms";
import { Link, useHistory } from "react-router-dom"

interface NavbarProps {
    username: string | undefined
}

type FormSceneNames = "Login" | "Register";

const Navbar: React.FC<NavbarProps> = ({ username }) => {

    const [sidebarShow, setSidebarShow] = useState<boolean>(false);
    const [currentSidebarForm, setSidebarForms] = useState<FormSceneNames>("Login");

    const hisotry = useHistory();

    const handleToggleSidebarOpen = () => {
        setSidebarShow( isOpen => !isOpen);
    }

    const changeScene = (scene: FormSceneNames, delay: number) => {
        setSidebarShow(false);
        setTimeout(() => {
            setSidebarForms(scene);
            setSidebarShow(true);
        }, delay);
    }

    const changeToRegisterWithDelay = () => changeScene("Register", 700)
    const changeToLoginWithDelay = () => changeScene("Login", 700)
    const changeToLogin = () => changeScene("Login", 0)

    const goToProfile = () => hisotry.push("/profile");

    return (
        <>
            <nav id="navbar">
                <Link to="/"><Logo className="app-logo" /></Link>
                <NavButton username={username} onClick={!!username ? goToProfile : changeToLogin} classes="user-button" />
            </nav>
            <Sidebar show={sidebarShow} closeHandler={handleToggleSidebarOpen} title={currentSidebarForm}>
                {currentSidebarForm === "Login" && <LoginForm changeFormScene={changeToRegisterWithDelay} />}
                {currentSidebarForm === "Register" && <RegisterForm changeFormScene={changeToLoginWithDelay} />}
            </Sidebar>
        </>
    )
}

export default Navbar

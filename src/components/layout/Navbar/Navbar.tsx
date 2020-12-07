import React, { useState } from 'react';
import "./Navbar.scss";
import { ReactComponent as Logo } from "assets/images/filmMap-logo-full.svg";
import { ReactComponent as UserIcon } from "assets/images/user-icon.svg";
import Button from "components/general/Button/Button";
import { Sidebar } from "components/layout"
import { RegisterForm, LoginForm } from "components/forms";
import Input from "components/general/Input/Input";

interface NavbarProps {
    username: string | undefined
}

const Navbar: React.FC<NavbarProps> = ({ username }) => {

    const [sidebarShow, setSidebarShow] = useState<boolean>(true);
    const [usernameInput, setUsername] = useState<string>("");

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    }

    return (
        <>
            <nav id="navbar">
                <Logo className="app-logo" />
                { !!username 
                ? <Button className="user-button"><UserIcon />{username}</Button> 
                : <Button className="log-in-button">logIn</Button> }
                
            </nav>
            <Sidebar show={sidebarShow} closeHandler={() => setSidebarShow(show => !show)} title="Login">
                {/* <LoginForm /> */}
                <RegisterForm />
                {/* <Input name="username" value={usernameInput} error={usernameInput} onChange={onChangeHandler} /> */}
            </Sidebar>
        </>
    )
}

export default Navbar

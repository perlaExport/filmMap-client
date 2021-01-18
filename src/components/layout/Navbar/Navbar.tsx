import React, { useState } from "react";
import "./Navbar.scss";
import { ReactComponent as Logo } from "assets/images/filmMap-logo-full.svg";
import { NavButton } from "components/general/Button";
import Sidebar from "components/layout/Sidebar";
import {
  RegisterForm,
  LoginForm,
  ForgotPassword,
  FormSceneNames,
  ResendLink,
} from "components/forms";
import { Link, useHistory } from "react-router-dom";
import { NavbarProps } from "./";

const Navbar: React.FC<NavbarProps> = ({ username }) => {
  const [sidebarShow, setSidebarShow] = useState<boolean>(false);
  const [currentSidebarForm, setSidebarForms] = useState<FormSceneNames>("Login");

  const hisotry = useHistory();

  const handleToggleSidebarOpen = () => {
    setSidebarShow((isOpen) => !isOpen);
  };

  const changeScene = (scene: FormSceneNames, delay: number) => {
    setSidebarShow(false);
    if (scene !== "Close") {
      setTimeout(() => {
        setSidebarForms(scene);
        setSidebarShow(true);
      }, delay);
    }
  };

  const changeToLogin = () => changeScene("Login", 0);

  const goToProfile = () => hisotry.push("/profile");

  return (
    <>
      <nav id="navbar">
        <Link to="/">
          <Logo className="app-logo" />
        </Link>
        <NavButton
          username={username}
          onClick={!!username ? goToProfile : changeToLogin}
          classes="user-button"
        />
      </nav>
      <Sidebar show={sidebarShow} closeHandler={handleToggleSidebarOpen} title={currentSidebarForm}>
        {currentSidebarForm === "Login" && <LoginForm changeSceneHandler={changeScene} />}
        {currentSidebarForm === "Register" && <RegisterForm changeSceneHandler={changeScene} />}
        {currentSidebarForm === "Resend Link" && <ResendLink />}
        {currentSidebarForm === "Forgot Password" && (
          <ForgotPassword changeSceneHandler={changeScene} />
        )}
      </Sidebar>
    </>
  );
};

export default Navbar;

import React from "react";
import "./RegistrationSuccess.scss";
import SuccessCheck from "components/general/SuccessCheck/SuccessCheck";
import { RegistrationSuccessProps } from "../";

const RegistrationSuccess: React.FC<RegistrationSuccessProps> = ({
  email,
  changeFormSceneToLogin,
}) => {
  return (
    <div className="registration-success">
      <SuccessCheck />
      <span className="successfull">Your registration was successful!</span>
      <span className="instructions">{"Activate your account using the link sent to "}</span>
      <strong className="email">{`"${email}"`}</strong>
      <button
        type="button"
        className="link-element login-nav-link"
        onClick={changeFormSceneToLogin}>
        go to Login
      </button>
    </div>
  );
};

export default RegistrationSuccess;

import React from "react";
import "./SuccessForm.scss";
import SuccessCheck from "components/general/SuccessCheck/SuccessCheck";
import { SuccessProps } from "../";

const SuccessForm: React.FC<SuccessProps> = ({ message, changeFormSceneToLogin }) => {
  return (
    <div className="registration-success">
      <SuccessCheck />
      <p className="message">{message}</p>
      <button
        type="button"
        className="link-element login-nav-link"
        onClick={changeFormSceneToLogin}>
        go to Login
      </button>
    </div>
  );
};

export default SuccessForm;

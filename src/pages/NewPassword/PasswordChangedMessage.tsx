import React from "react";
import SuccessCheck from "components/general/SuccessCheck/SuccessCheck";
import "./PasswordChangedMessage.scss";

const PasswordChangedMessage = () => {
  return (
    <div className="password-changed-message">
      <SuccessCheck />
      <h1>Password successfully chnaged</h1>
    </div>
  );
};

export default PasswordChangedMessage;

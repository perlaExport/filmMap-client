import React from "react";
import SuccessForm from "../SuccessForm/SuccessForm";

interface RSuccessProps {
  changeFormSceneToLogin: () => void;
  email: string;
}

const RSuccess: React.FC<RSuccessProps> = ({ changeFormSceneToLogin, email }) => {
  return (
    <SuccessForm
      message={
        <>
          <span className="successfull">Your registration was successful!</span>
          <span className="instructions">{"Activate your account using the link sent to "}</span>
          <strong className="email">{`"${email}"`}</strong>
        </>
      }
      changeFormSceneToLogin={changeFormSceneToLogin}
    />
  );
};

export default RSuccess;

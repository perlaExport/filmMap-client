import React from "react";
import SuccessForm from "../SuccessForm/SuccessForm";

interface FPSuccessProps {
  changeFormSceneToLogin: () => void;
}

const FPSuccess: React.FC<FPSuccessProps> = ({ changeFormSceneToLogin }) => {
  return (
    <SuccessForm
      message={
        <>
          <span className="successfull">Password reset link sent!</span>
          <span className="instructions">Check your inbox</span>
        </>
      }
      changeFormSceneToLogin={changeFormSceneToLogin}
    />
  );
};

export default FPSuccess;

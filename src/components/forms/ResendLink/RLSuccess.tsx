import React from "react";
import SuccessForm from "../SuccessForm/SuccessForm";

const RLSuccess = () => {
  return (
    <SuccessForm
      message={
        <>
          <span className="successfull">Activation link was resent</span>
          <span className="instructions">Check your inbox</span>
        </>
      }
    />
  );
};

export default RLSuccess;

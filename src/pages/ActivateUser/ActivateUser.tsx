import React, { useState, useEffect } from "react";
import { ActivateUserProps } from "./";
import callAPI from "helper/api";
import LoadingWrapper from "components/layout/LoadingWrapper";
import SuccessCheck from "components/general/SuccessCheck/SuccessCheck";
import { useHistory } from "react-router-dom";
import "./ActivateUser.scss";

const ActivateUser: React.FC<ActivateUserProps> = ({ userId, token }) => {
  const history = useHistory();
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const activateUserHandler = async () => {
      const { status } = await callAPI({
        url: "/register/confirm",
        method: "PUT",
        setLoading,
        queryParams: {
          id: userId,
          token,
        },
      });
      if (status === 200) {
        setTimeout(() => {
          history.replace("/");
        }, 3000);
      }
    };
    activateUserHandler();

    return () => {};
  }, [history, userId, token]);

  return (
    <LoadingWrapper className="activate-user-page" isLoading={isLoading}>
      <SuccessCheck />
      <h1 className="message">Account successfully activated</h1>
    </LoadingWrapper>
  );
};

export default ActivateUser;

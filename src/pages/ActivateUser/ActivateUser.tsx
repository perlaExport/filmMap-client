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
    setTimeout(() => {
      setLoading(false);
      console.log("stop loading");
      setTimeout(() => {
        console.log("redirect");

        history.replace("/");
      }, 3000);
    }, 3000);

    return () => {};
  }, [history]);

  const activateUserHandler = async () => {
    const { data, status, error } = await callAPI({
      url: "/get_current_user",
      method: "GET",
      setLoading,
    });
    console.log(data, status, error);
  };
  return (
    <LoadingWrapper className="activate-user-page" isLoading={isLoading}>
      <SuccessCheck />
      <h1 className="message">Account successfully activated</h1>
    </LoadingWrapper>
  );
};

export default ActivateUser;

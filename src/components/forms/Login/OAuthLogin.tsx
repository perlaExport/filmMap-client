import React from "react";
import { ReactComponent as GoogleLogo } from "assets/images/google-logo-color.svg";

const OAuthLogin: React.FC = () => {
  const redirectToOAuth = () => {
    const { REACT_APP_SERVER_URL } = process.env;
    const BASE_URL = REACT_APP_SERVER_URL || "http://localhost:8181";
    window.location.href = `${BASE_URL}/oauth2/authorize/google`;
  };

  return (
    <button type="button" onClick={redirectToOAuth} className="oath-options-group">
      <GoogleLogo />
      <span>Login with Google</span>
    </button>
  );
};

export default OAuthLogin;

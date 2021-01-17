import React, { useContext, useEffect } from "react";
import "./App.scss";
import Navbar from "components/layout/Navbar";
import Routes from "pages/Routes";
import { UserContext } from "context/UserContext";
import callAPI from "helper/api";

const App: React.FC = () => {
  const [{ user }, dispatchUser] = useContext(UserContext);

  useEffect(() => {
    const isUserAuthenticated = async () => {
      const { data, status } = await callAPI({
        url: "/get_current_user",
        method: "GET",
        token: true,
      });
      if (status === 200) dispatchUser({ type: "LOGIN_SUCCESS", payload: { user: data.name } });
      else dispatchUser({ type: "LOGIN_FAIL" });
    };
    isUserAuthenticated();

    return () => {};
  }, [dispatchUser]);

  return (
    <div className="App">
      <Navbar username={user} />
      <section className="page-container">
        <Routes />
      </section>
    </div>
  );
};

export default App;

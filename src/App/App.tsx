import React, { useContext, useEffect } from 'react';
import './App.scss';
import { Navbar } from "components/layout";
import Routes from "pages/Routes";
import {  UserContext } from "context/userContext";
import callAPI from "helper/apiCall";

const App: React.FC = () => {

  const [{user, authStatus}, dispatchUser] = useContext(UserContext);

  useEffect(() => {
    const isUserAuthenticated = async () => {
      const { data, status, error } = await callAPI({
        url: "/get_current_user",
        method: "GET",
        token: true
      });
      if(status === 200) {
        dispatchUser({ type: "LOGIN_SUCCESS", payload: { user: data.name } })
      }
      console.log(data, status, error)
    }
    isUserAuthenticated(); 
    
    return () => {
    }
  }, [dispatchUser])

  return (
    <div className="App">
        <Navbar username={user} />
          <section className="page-container">
            <Routes authStatus={authStatus} />
          </section>
    </div>
  );
}

export default App;

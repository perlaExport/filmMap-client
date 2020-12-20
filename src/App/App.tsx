import React, { useContext } from 'react';
import './App.scss';
import { Navbar } from "components/layout";
import Routes from "pages/Routes";
import {  UserContext } from "context/userContext"

const App: React.FC = () => {

  const [{user, authStatus}] = useContext(UserContext);

  return (
    <div className="App">
        <Navbar username={user} />
          <section className="page-container">
            <Routes isAuth={authStatus === "success"} />
          </section>
    </div>
  );
}

export default App;

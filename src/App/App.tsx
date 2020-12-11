import React from 'react';
import './App.scss';
import { Navbar } from "components/layout";
import Routes from "pages/Routes";
import { BrowserRouter } from "react-router-dom";

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar username={undefined} />
          <section className="page-container">
            <Routes isAuth={true} />
          </section>
        </BrowserRouter>
    </div>
  );
}

export default App;

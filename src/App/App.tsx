import React from 'react';
import './App.scss';
import { Navbar } from "components/layout";
import Routes from "pages/Routes";
import { BrowserRouter } from "react-router-dom";

const App: React.FC = () => {
  return (
    <div className="App">
      <Navbar username={undefined} />
        <section className="page-container">
          <BrowserRouter><Routes isAuth={true} /></BrowserRouter>
        </section>
    </div>
  );
}

export default App;

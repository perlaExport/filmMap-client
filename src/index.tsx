import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import * as serviceWorker from './serviceWorker';
import { UserProvider } from "context/userContext"
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

const BASE_API_URI = process.env.REACT_APP_SERVER_URL || "http://localhost:8181"
const API_URI = process.env.NODE_ENV === "production" ? "/" : BASE_API_URI
axios.defaults.baseURL = API_URI;

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <UserProvider>
      <App />
    </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();

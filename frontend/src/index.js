import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import axios from "axios";
import { Provider } from "react-redux";
import { store } from './store'
axios.defaults.baseURL ="http://localhost:5000";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
    <Provider store={store} >
      <App />
    </Provider>
    {/* </BrowserRouter> */}
  </React.StrictMode>
);
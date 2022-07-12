import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
// components
import App from "./App";

// global styles
import "./styles/styles.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <Router>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>
);

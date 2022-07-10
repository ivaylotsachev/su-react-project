import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

// components
import App from "./App";

// global styles
import "./styles/styles.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <Router>
        <App />
    </Router>
);

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setCurrentUser, setIsLoggedIn } from "./redux/actions/userActions";
import { getAuth } from "firebase/auth";
// components
import { Header } from "./components";
import AnimatedRoutes from "./components/AnimatedRoutes";

let matched = window.matchMedia("(prefers-color-scheme: dark)").matches;

matched
    ? document.body.classList.add("js-dark")
    : document.body.classList.remove("js-dark");

function App() {
    return (
        <>
            <Header />
            <AnimatedRoutes />
        </>
    );
}

export default App;

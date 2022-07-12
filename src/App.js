import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "./firebase";
// components
import { Header } from "./components";
// pages
import { HomePage, LoginPage, RegisterPage } from "./pages";
import { setAuth } from "./redux/actions/userActions";

function App() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("APP: user is logged in");
                dispatch(setAuth(user));
            }
        });
    }, []);

    return (
        <>
            <Header />
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
            </Routes>
        </>
    );
}

export default App;

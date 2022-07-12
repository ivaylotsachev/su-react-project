import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
// components
import { Header } from "./components";
// pages
import { HomePage, LoginPage, RegisterPage, CreatePost } from "./pages";
import { getAuth } from "firebase/auth";
import { setCurrentUser, setIsLoggedIn } from "./redux/actions/userActions";

function App() {
    // contants
    const dispatch = useDispatch();
    const auth = getAuth();

    // hooks
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("App: user is logged in", user);
                dispatch(setCurrentUser(user));
                dispatch(setIsLoggedIn(true));
            } else {
                console.log("App: user is logged in", user);
                dispatch(setCurrentUser(null));
                dispatch(setIsLoggedIn(false));
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
                <Route path='/create' element={<CreatePost />} />
            </Routes>
        </>
    );
}

export default App;

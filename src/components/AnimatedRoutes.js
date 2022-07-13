import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setCurrentUser, setIsLoggedIn } from "../redux/actions/userActions";
// components
import {
    CreatePost,
    HomePage,
    LoginPage,
    RegisterPage,
    UserPosts,
} from "../pages";

const AnimatedRoutes = () => {
    // constants
    const location = useLocation();
    const dispatch = useDispatch();
    const auth = getAuth();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            console.log("AnimatedRoutes: user is logged in");

            if (user) {
                dispatch(setCurrentUser(user));
                dispatch(setIsLoggedIn(true));
            } else {
                dispatch(setCurrentUser(null));
                dispatch(setIsLoggedIn(false));
            }
        });
    }, []);

    return (
        <AnimatePresence exitBeforeEnter>
            <Routes location={location} key={location.pathname}>
                <Route path='/' element={<HomePage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/create' element={<CreatePost />} />
                <Route path='/user-posts' element={<UserPosts />} />
            </Routes>
        </AnimatePresence>
    );
};

export default AnimatedRoutes;

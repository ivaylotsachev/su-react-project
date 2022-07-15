import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setCurrentUser, setIsLoggedIn } from "../redux/actions/userActions";
import { getUserFromDatabase } from "../utils/firebaseUtils/usersUtils";

// pages
import {
    CreatePost,
    HomePage,
    LoginPage,
    RegisterPage,
    UserPosts,
    PostPage,
} from "../pages";

const AnimatedRoutes = () => {
    // constants
    const location = useLocation();
    const dispatch = useDispatch();
    const auth = getAuth();

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                await getUserFromDatabase(dispatch, setCurrentUser).then(
                    (data) => {
                        dispatch(setIsLoggedIn(true));
                        console.error("User is logged in");
                    }
                );
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
                <Route path='/post/:postId' element={<PostPage />} />
            </Routes>
        </AnimatePresence>
    );
};

export default AnimatedRoutes;

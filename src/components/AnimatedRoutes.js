import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
// components
import { CreatePost, HomePage, LoginPage, RegisterPage } from "../pages";

const AnimatedRoutes = () => {
    // constants
    const location = useLocation();

    return (
        <AnimatePresence exitBeforeEnter>
            <Routes location={location} key={location.pathname}>
                <Route path='/' element={<HomePage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/create' element={<CreatePost />} />
            </Routes>
        </AnimatePresence>
    );
};

export default AnimatedRoutes;

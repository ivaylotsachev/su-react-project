import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// components
import { Header } from "./components";
// pages
import { HomePage, LoginPage } from "./pages";

function App() {
    useEffect(() => {
        const auth = getAuth();

        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.error("user is logged in", user);
            }
        });
    }, []);

    return (
        <>
            <Header />
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/login' element={<LoginPage />} />
            </Routes>
        </>
    );
}

export default App;

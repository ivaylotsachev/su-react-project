import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setCurrentUser, setIsLoggedIn } from "./redux/actions/userActions";
import { getAuth } from "firebase/auth";
// components
import { Header } from "./components";
import AnimatedRoutes from "./components/AnimatedRoutes";

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
            <AnimatedRoutes />
            {/* <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/create' element={<CreatePost />} />
            </Routes> */}
        </>
    );
}

export default App;

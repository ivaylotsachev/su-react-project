import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAuth, signInWithEmailAndPassword } from "@firebase/auth";
import { setIsLoggedIn, setCurrentUser } from "../../redux/actions/userActions";
import { motion } from "framer-motion";

const Login = () => {
    // Constants
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState({ email: "", password: "" });
    const { email, password } = user;

    // Methods:
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const auth = getAuth();

        signInWithEmailAndPassword(auth, email, password)
            .then((userInfo) => {
                dispatch(setCurrentUser(userInfo.user));
                dispatch(setIsLoggedIn(true));
                navigate("/");
            })
            .catch((error) => {
                console.error("Login failed: ", error.message);
            });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='page-container flex flex-center w-100'
        >
            <form className='flex flex-column p-5' onSubmit={handleSubmit}>
                <h3 className='form-title mb-3'>Login</h3>
                <div className='input-container flex flex-column'>
                    <label className='mb-2' htmlFor='email'>
                        Email *
                    </label>
                    <input
                        type='email'
                        name='email'
                        id='email'
                        value={email}
                        required
                        onChange={handleChange}
                    />
                </div>
                <div className='input-container flex flex-column my-4'>
                    <label className='mb-2' htmlFor='password'>
                        Password *
                    </label>
                    <input
                        type='password'
                        name='password'
                        id='password'
                        value={password}
                        required
                        onChange={handleChange}
                    />
                </div>
                <button className='button my-2' type='submit'>
                    Login
                </button>
                <div className='mt-5 flex aic jcsb'>
                    <p>Dont have an account?</p>
                    <Link to={"/register"}>
                        <button className='button'>Register</button>
                    </Link>
                </div>
            </form>
        </motion.div>
    );
};

export default Login;

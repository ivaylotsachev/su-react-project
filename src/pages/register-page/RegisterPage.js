import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "@firebase/auth";
import { getAuth } from "@firebase/auth";
import { motion } from "framer-motion";

const RegisterPage = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
        displayName: "",
    });

    const { email, password, displayName } = user;
    const navigate = useNavigate();
    const auth = getAuth();

    // Methods:
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Reguster submit ", user);

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCrdential) => {
                updateProfile(auth.currentUser, { displayName })
                    .then((user) => {
                        console.log("Register user updated", auth.currentUser);
                        navigate("/login");
                    })
                    .catch((error) => {
                        console.error("Register user update failed");
                    });
            })
            .catch((error) => console.log("Register error", error));
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='page-container flex flex-center w-100'
        >
            <form className='flex flex-column p-5' onSubmit={handleSubmit}>
                <h3 className='mb-3'>Register</h3>
                <div className='input-container flex flex-column'>
                    <label htmlFor='email'>Email *</label>
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
                    <label className='mb-1' htmlFor='password'>
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
                <div className='input-container flex flex-column'>
                    <label htmlFor='name'>Choose your display name *</label>
                    <input
                        type='text'
                        name='displayName'
                        id='name'
                        value={displayName}
                        required
                        onChange={handleChange}
                    />
                </div>
                <button className='button mt-5' type='submit'>
                    Create an account
                </button>
            </form>
        </motion.div>
    );
};

export default RegisterPage;

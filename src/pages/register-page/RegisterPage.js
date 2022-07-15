import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "@firebase/auth";
import { getAuth } from "@firebase/auth";
import { motion } from "framer-motion";
import { storeUserToDatabase } from "../../utils/firebaseUtils/usersUtils";

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

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCrdential) => {
                updateProfile(auth.currentUser, { displayName })
                    .then(async (user) => {
                        await storeUserToDatabase().then(() => navigate("/"));
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
                <h3 className='form-title mb-4'>Register</h3>
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
                <div className='input-container flex flex-column'>
                    <label htmlFor='name' className='mb-2'>
                        Choose your display name *
                    </label>
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
                    Register
                </button>
            </form>
        </motion.div>
    );
};

export default RegisterPage;

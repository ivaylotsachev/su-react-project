import { useEffect } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebase.js";

const Login = () => {
    useEffect(() => {
        const auth = getAuth();

        signInWithEmailAndPassword(auth, "itsa4ev@gmaill.com", "123456")
            .then((userCredentials) => {
                console.log("user", userCredentials.user);
            })
            .catch((error) => {
                console.log("Error:", error.message);
            });
    }, []);

    return <div>Login</div>;
};

export default Login;

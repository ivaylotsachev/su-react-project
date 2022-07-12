import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { setAuth, setCurrentUser } from "../../redux/actions/userActions";

// styles
import "./Header.scss";

const Header = () => {
    // constants
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

    useEffect(() => {
        isAuthenticated && setUser(isAuthenticated.displayName);
        console.log("header: isAuth", isAuthenticated);
    }, [isAuthenticated]);

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                console.log("user has signed out");
                dispatch(setAuth(false));
                dispatch(setCurrentUser(null));
            })
            .catch((error) => {
                console.log("Sign out error");
            });
    };

    return (
        <header className='main-header w-100'>
            <nav className='main-nav w-100'>
                <ul className='main-nav-list flex jcsb aic w-100'>
                    <li className='main-nav-item'>
                        <Link to='/' className='main-nav-link'>
                            Little Letter
                        </Link>
                    </li>
                    {user && <p className='main-nav-item'>Welcome: {user}</p>}
                    <div>
                        {!isAuthenticated && (
                            <li className='main-nav-item'>
                                <Link to='/login' className='main-nav-link'>
                                    Login
                                </Link>
                            </li>
                        )}
                        {isAuthenticated && (
                            <div className='flex aic'>
                                <li className='main-nav-item'>
                                    <Link to={"/create"}>Create post</Link>
                                </li>
                                <li className='main-nav-item'>
                                    <Link to={"/profile"}>Profile</Link>
                                </li>
                                <li
                                    className='main-nav-item'
                                    onClick={handleSignOut}
                                >
                                    <p>SignOut</p>
                                </li>
                            </div>
                        )}
                    </div>
                </ul>
            </nav>
        </header>
    );
};

export default Header;

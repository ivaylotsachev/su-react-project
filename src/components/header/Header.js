import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { setIsLoggedIn, setCurrentUser } from "../../redux/actions/userActions";

// styles
import "./Header.scss";

const Header = () => {
    // constants
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const currentUser = useSelector((state) => state.user.currentUser);

    // methods
    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                dispatch(setIsLoggedIn(false));
                dispatch(setCurrentUser(null));
            })
            .catch((error) => {
                console.log("Sign out error", error);
            });
    };

    // hooks
    useEffect(() => {
        console.log("header: isLoggedIn", isLoggedIn);
    }, [isLoggedIn]);

    useEffect(() => {
        currentUser && setUser(currentUser.displayName);
    }, [currentUser]);

    return (
        <header className='main-header w-100'>
            <nav className='main-nav w-100'>
                <ul className='main-nav-list flex jcsb aic w-100'>
                    <li className='main-nav-item'>
                        <Link to='/' className='main-nav-link'>
                            Little Letter
                        </Link>
                    </li>

                    <div>
                        {!isLoggedIn && (
                            <li className='main-nav-item'>
                                <Link to='/login' className='main-nav-link'>
                                    Login
                                </Link>
                            </li>
                        )}

                        {isLoggedIn && (
                            <div className='flex aic'>
                                <li className='main-nav-item'>
                                    <Link to={"/create"}>Create post</Link>
                                </li>
                                <li className='main-nav-item'>
                                    <Link to={"/profile"}>Profile</Link>
                                </li>
                            </div>
                        )}
                    </div>

                    {isLoggedIn && (
                        <div className='flex main-nav-item aic'>
                            <p>
                                Welcome:{" "}
                                {currentUser.displayName || "Annonumous"}{" "}
                            </p>
                            <span
                                className='sign-out-button'
                                onClick={handleSignOut}
                            >
                                SignOut
                            </span>
                        </div>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;

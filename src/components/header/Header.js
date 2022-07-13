import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { setIsLoggedIn, setCurrentUser } from "../../redux/actions/userActions";
import { useNavigate } from "react-router-dom";

// styles
import "./Header.scss";

const Header = () => {
    // constants
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const currentUser = useSelector((state) => state.user.currentUser);

    // methods
    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                dispatch(setIsLoggedIn(false));
                dispatch(setCurrentUser(null));
                navigate("/");
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
        <header className='main-header w-100 p-3'>
            <nav className='main-nav w-100'>
                <ul className='main-nav-list flex jcsb aic w-100'>
                    <div className='flex'>
                        <li className='main-nav-item'>
                            <NavLink to='/' className='main-nav-link'>
                                <strong className='brand'>M</strong>
                            </NavLink>
                        </li>
                        {isLoggedIn && (
                            <div className='flex aic'>
                                <li className='main-nav-item'>
                                    <NavLink
                                        to={"/user-posts"}
                                        className={({ isActive }) =>
                                            isActive ? "active-link" : ""
                                        }
                                    >
                                        My posts
                                    </NavLink>
                                </li>
                                <li className='main-nav-item'>
                                    <NavLink
                                        to={"/create"}
                                        className={({ isActive }) =>
                                            isActive ? "active-link" : ""
                                        }
                                    >
                                        Create post
                                    </NavLink>
                                </li>
                            </div>
                        )}
                    </div>

                    <div>
                        {!isLoggedIn && (
                            <li className='main-nav-item'>
                                <NavLink
                                    to='/login'
                                    className={({ isActive }) =>
                                        isActive ? "active-link" : ""
                                    }
                                >
                                    Login
                                </NavLink>
                            </li>
                        )}
                    </div>

                    {isLoggedIn && (
                        <div className='flex main-nav-item aic'>
                            <p
                                className='sign-out-button ml-3'
                                onClick={handleSignOut}
                            >
                                Logout
                            </p>
                        </div>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { setIsLoggedIn, setCurrentUser } from "../../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
import { FaUser, FaSignOutAlt } from "react-icons/fa";

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

    useEffect(() => {
        currentUser && setUser(currentUser);
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
                                <p>{user && user.posts}</p>
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
                        <div className='flex aic'>
                            <p className='active-user main-nav-item'>
                                <FaUser className='mr-2' />{" "}
                                <strong>{user && user.displayName}</strong>
                            </p>

                            <p
                                className='main-nav-item sign-out-button button button-rounded ml-3 pointer flex aic'
                                onClick={handleSignOut}
                            >
                                <FaSignOutAlt className='mr-2' /> Logout
                            </p>
                        </div>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;

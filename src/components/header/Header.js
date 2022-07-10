import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// styles
import "./Header.scss";

const Header = () => {
    return (
        <header className='main-header'>
            <nav className='main-nav'>
                <ul className='main-nav-list flex'>
                    <li className='main-nav-item'>
                        <Link to='/' className='main-nav-link'>
                            Home
                        </Link>
                    </li>
                    <motion.li className='main-nav-item'>
                        <Link to='/login' className='main-nav-link'>
                            Login
                        </Link>
                    </motion.li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;

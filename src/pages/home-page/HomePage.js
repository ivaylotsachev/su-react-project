import { useSelector } from "react-redux";
import { motion } from "framer-motion";
// components
import PostList from "../../components/post-list/PostList";
import { useEffect } from "react";

function HomePage() {
    // constants
    const currentUser = useSelector((state) => state.user.currentUser);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='page-container flex flex-column w-100'
        >
            <section className='page-section home-head-section mb-5'>
                {currentUser && (
                    <p className='mb-5'>
                        user: <strong>{currentUser.displayName}</strong>
                    </p>
                )}
                <div className='text-center'>
                    <h1 className='page-title'>Welcome to Memos</h1>
                    <h3 className='title-desctiption'>
                        Your today`s best memories!
                    </h3>
                </div>
            </section>

            <section className='page-section home-head-section'>
                <h4 className='title-normal mt-4'>All Stories</h4>
                <div className='divider mb-2'></div>
                <PostList />
            </section>
        </motion.div>
    );
}

export default HomePage;

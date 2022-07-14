import { useEffect } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import PostItem from "../../components/post-list/post-item/PostItem";
import { useNavigate } from "react-router-dom";

const UserPosts = () => {
    // constants
    const currentUser = useSelector((state) => state.user.currentUser);
    const posts = useSelector((state) => state.posts.posts);
    const navigate = useNavigate();

    // methods
    const handleClick = (id) => {
        navigate(`/post/${id}`);
    };

    const renderPosts = () => {
        const hasPosts = posts.find((post) => post.userId === currentUser.uid);

        if (!hasPosts && currentUser)
            return (
                <p>
                    <strong>{currentUser.displayName}</strong> you dont have any
                    posts. It`s perfect time to share some memories with us!
                </p>
            );

        return posts.map((post) => {
            if (post.userId === currentUser.uid) {
                return (
                    <PostItem
                        key={post.id}
                        {...post}
                        ellipsis={true}
                        handleClick={handleClick}
                    />
                );
            }
        });
    };

    useEffect(() => {
        console.log("UserPosts: posts updated", posts);
        renderPosts();
    }, [posts]);

    return (
        <>
            {currentUser && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className='page-container user-posts-container jcsb'
                >
                    <h2 className='section-title my-2'>My posts</h2>
                    <div className='divider mb-2'></div>
                    <div className='use-posts-wrapper flex flex-wrap'>
                        {renderPosts()}
                    </div>
                </motion.div>
            )}
        </>
    );
};

export default UserPosts;

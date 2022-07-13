import { useEffect } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import PostItem from "../../components/post-list/post-item/PostItem";

const UserPosts = () => {
    const currentUser = useSelector((state) => state.user.currentUser);
    const posts = useSelector((state) => state.posts.posts);

    console.log("UserPosts: ", posts);
    console.log("UserPosts: ", currentUser);

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
                return <PostItem key={post.id} {...post} ellipsis={true} />;
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
                    className='page-container user-posts-container'
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

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

// styles
import "./PostPage.scss";
import PostItem from "../../components/post-list/post-item/PostItem";

const PostPage = () => {
    // constants
    const [selectedPost, setSelectedPost] = useState({});
    const posts = useSelector((state) => state.posts.posts);
    const { postId } = useParams();

    useEffect(() => {
        if (posts) {
            const item = posts.filter((post) => post.id === postId);
            item && setSelectedPost(item[0]);
        }
    }, [posts, postId]);

    return (
        <>
            {selectedPost && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className='page-container selected-post-container flex jcsb'
                >
                    <PostItem {...selectedPost} />
                </motion.div>
            )}
        </>
    );
};

export default PostPage;

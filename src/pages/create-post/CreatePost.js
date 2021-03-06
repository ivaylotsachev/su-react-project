import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { database } from "../../firebase";
import { motion } from "framer-motion";
import { updateUserPostsCount } from "../../utils/firebaseUtils/usersUtils";
import { setCurrentUser } from "../../redux/actions/userActions";
import { storePostToDatabase } from "../../utils/firebaseUtils/postsUtils";

const CreatePost = () => {
    // constants
    const [post, setPost] = useState({
        content: "some content",
        title: "nekava title",
        userId: null,
        imageUrl: "",
    });
    const { title, content } = post;
    const currentUser = useSelector((state) => state.user.currentUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // methods
    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedPost = {
            ...post,
            userId: currentUser.userId,
            userEmail: currentUser.email,
            createdBy: currentUser.displayName,
            createdAt: Timestamp.fromDate(new Date(Date.now())),
        };

        await storePostToDatabase(updatedPost).then(async (data) => {
            await updateUserPostsCount(dispatch, setCurrentUser).then(() =>
                navigate("/")
            );
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='page-container flex flex-center'
        >
            <form className='flex flex-column p-5' onSubmit={handleSubmit}>
                <h3 className='form-title mb-3'>Create Post</h3>
                <div className='input-container flex flex-column mb-3'>
                    <label htmlFor='title' className='mb-2'>
                        Post Title *
                    </label>
                    <input
                        type='text'
                        id='title'
                        name='title'
                        required
                        value={title}
                        onChange={handleChange}
                    />
                </div>
                <div className='input-container flex flex-column mb-3'>
                    <label htmlFor='content' className='mb-2'>
                        Post Content *
                    </label>
                    <textarea
                        id='content'
                        name='content'
                        required
                        value={content}
                        onChange={handleChange}
                    />
                </div>
                <div className='input-container flex flex-column mb-5'>
                    <label htmlFor='postImage' className='mb-2'>
                        Post imageUrl
                    </label>
                    <input
                        type='text'
                        name='imageUrl'
                        id='postImage'
                        onChange={handleChange}
                    />
                </div>
                <button type='submit'>Create</button>
            </form>
        </motion.div>
    );
};

export default CreatePost;

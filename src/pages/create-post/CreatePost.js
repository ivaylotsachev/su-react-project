import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { addDoc, collection } from "firebase/firestore";
import { database } from "../../firebase";
import { motion } from "framer-motion";

const CreatePost = () => {
    // constants
    const [post, setPost] = useState({
        content: "",
        title: "",
        userId: null,
        imageUrl: "",
    });
    const currentUser = useSelector((state) => state.user.currentUser);
    const { title, content } = post;
    const navigate = useNavigate();

    // methods
    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // create post
        const postsCollectionRef = collection(database, "posts");

        await addDoc(postsCollectionRef, {
            ...post,
            userId: currentUser.uid,
            createdBy: currentUser.displayName,
            likes: 0,
        }).then((data) => {
            navigate("/");
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
                        maxLength={300}
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

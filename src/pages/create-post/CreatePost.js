import { useState } from "react";
import { useSelector } from "react-redux";
import { addDoc, collection } from "firebase/firestore";
import { database } from "../../firebase";

const CreatePost = () => {
    // constants
    const [post, setPost] = useState({ content: "", title: "", userId: null });
    const state = useSelector((state) => state);
    const { title, content } = post;
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
            userId: state.user.currentUser.uid,
        }).then((data) => {
            console.error("==============", data);
        });
    };

    return (
        <div className='page-container flex flex-center'>
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
                <div className='input-container flex flex-column mb-5'>
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
                    <p>Content must be maximum 300 charecters!</p>
                </div>
                <button type='submit'>Create</button>
            </form>
        </div>
    );
};

export default CreatePost;

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { database } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { setPosts } from "../../redux/actions/postActions";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

function HomePage() {
    // constants
    const posts = useSelector((state) => state.posts.posts);
    const dispatch = useDispatch();

    // methods
    const getPosts = async () => {
        const postsCollectionRef = collection(database, "posts");
        const data = await getDocs(postsCollectionRef);

        const docs = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));

        dispatch(setPosts(docs));
    };

    // hooks
    useEffect(() => {
        getPosts();
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='page-container flex flex-column w-100'
        >
            <section className='page-section home-head-section'>
                <h1 className='page-title'>Little Letter</h1>
                <p className='title-desctiption'>Your today`s best memories!</p>
            </section>
            <hr />
            <section className='page-section home-head-section'>
                <h4 className='title-normal'>All Stories</h4>
                {posts.map((post) => (
                    <div key={post.id} className='my-4'>
                        <h1>Title: {post.title}</h1>
                        <p>{post.content}</p>
                        <img src={post.imageUrl} alt='' />
                        <hr />
                    </div>
                ))}
            </section>
        </motion.div>
    );
}

export default HomePage;

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { database } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { setPosts } from "../../redux/actions/postActions";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import PostList from "../../components/post-list/PostList";

function HomePage() {
    // constants
    const posts = useSelector((state) => state.posts.posts);
    const currentUser = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();
    const postsCollectionRef = collection(database, "posts");

    // methods
    const getPosts = async () => {
        const data = await getDocs(postsCollectionRef);

        const docs = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));

        dispatch(setPosts(docs) || []);
    };

    // hooks
    useEffect(() => {
        getPosts();
        console.log("possss", posts);
    }, []);

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

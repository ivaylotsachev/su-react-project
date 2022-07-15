import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { database } from "./firebase";
import AnimatedRoutes from "./components/AnimatedRoutes";
import {
    getDatabasePosts,
    subscribeToPostCollection,
} from "./utils/firebaseUtils/postsUtils";

// components
import { Header } from "./components";
import { setPosts } from "./redux/actions/postActions";

// TODO: Find a better place to do this.
let matched = window.matchMedia("(prefers-color-scheme: dark)").matches;

matched
    ? document.body.classList.add("js-dark")
    : document.body.classList.remove("js-dark");

function App() {
    // constants
    const dispatch = useDispatch();

    // hooks
    useEffect(() => {
        getDatabasePosts(database, dispatch, setPosts);
        subscribeToPostCollection(database, dispatch, setPosts);
    }, []);

    return (
        <>
            <Header />
            <AnimatedRoutes />
        </>
    );
}

export default App;

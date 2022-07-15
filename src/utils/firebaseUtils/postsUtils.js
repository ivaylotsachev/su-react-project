import { v4 as uuidv4 } from "uuid";
import {
    collection,
    doc,
    getDocs,
    onSnapshot,
    setDoc,
} from "firebase/firestore";
import { auth, database } from "../../firebase";

export const storePostToDatabase = async (post) => {
    const postsRef = collection(database, "posts");

    await setDoc(doc(postsRef), {
        ...post,
    });
};

export const getDatabasePosts = async (database, dispatch, callback) => {
    console.log("firebaeUtils: getDatabasePosts");

    const collectionRef = collection(database, "posts");
    const data = await getDocs(collectionRef);
    const docs = data.docs.map((doc) => {
        return {
            ...doc.data(),
            id: doc.id,
        };
    });

    dispatch(callback(docs) || []);
};

export const subscribeToPostCollection = (database, dispatch, callback) => {
    const unsubscribe = onSnapshot(
        collection(database, "posts"),
        (snapshot) => {
            getDatabasePosts(database, dispatch, callback);
            console.log("firebase post utils: subscribed");
        }
    );
};

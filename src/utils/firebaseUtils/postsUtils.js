import { collection, getDocs, onSnapshot } from "firebase/firestore";

export const getDatabasePosts = async (database, dispatch, callback) => {
    console.log("firebaeUtils: getDatabasePosts");

    const collectionRef = collection(database, "posts");
    const data = await getDocs(collectionRef);
    const docs = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
    }));

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

import {
    collection,
    getDocs,
    onSnapshot,
    query,
    where,
} from "firebase/firestore";

export const getDatabasePosts = async (database, dispatch, callback) => {
    console.log("firebaeUtils: getPosts");

    const collectionRef = collection(database, "posts");
    const data = await getDocs(collectionRef);
    const docs = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
    }));

    dispatch(callback(docs) || []);
};

export const subscribeToPostCollection = (database, dispatch, callback) => {
    const q = query(collection(database, "posts"), where("state", "==", "CA"));

    const unsubscribe = onSnapshot(
        collection(database, "posts"),
        (snapshot) => {
            // ...
            console.log("firebaseUtils: Post collection has been updated!");
            getDatabasePosts(database, dispatch, callback);
        }
    );
};

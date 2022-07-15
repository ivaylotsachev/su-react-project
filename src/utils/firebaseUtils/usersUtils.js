import { auth, database } from "../../firebase";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export const storeUserToDatabase = async () => {
    const usersRef = collection(database, "users");
    const user = auth.currentUser;

    await setDoc(doc(usersRef, `${user.email}`), {
        email: user.email,
        userId: user.uid,
        posts: 0,
    });
};

export const updateUserPostsCount = async () => {
    const user = auth.currentUser;
    const docRef = doc(database, "users", `${user.email}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        await updateDoc(doc(database, "users", `${user.email}`), {
            ...docSnap.data(),
            posts: docSnap.data().posts + 1,
        });
    } else {
        console.log("No such document!");
    }
};

import { auth, database } from "../../firebase";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export const storeUserToDatabase = async () => {
    const usersRef = collection(database, "users");
    const user = auth.currentUser;

    await setDoc(doc(usersRef, `${user.email}`), {
        email: user.email,
        userId: user.uid,
        displayName: user.displayName,
        posts: 0,
    }).then((data) => console.log("User has been stored in user collection"));
};

export const getUserFromDatabase = async (dispatch, action) => {
    const user = auth.currentUser;
    const docRef = doc(database, "users", `${user.email}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        dispatch(action(docSnap.data()));
    }
};

export const updateUserPostsCount = async (dispatch, action, type) => {
    const user = auth.currentUser;
    const docRef = doc(database, "users", `${user.email}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const num =
            type === "decrement"
                ? docSnap.data().posts - 1
                : docSnap.data().posts + 1;

        await updateDoc(doc(database, "users", `${user.email}`), {
            ...docSnap.data(),
            posts: num,
        }).then((data) => getUserFromDatabase(dispatch, action));
    } else {
        console.log("No such document!");
    }
};

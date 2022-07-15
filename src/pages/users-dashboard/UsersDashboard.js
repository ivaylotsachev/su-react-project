import { useEffect } from "react";
import { useSelector } from "react-redux";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { database, auth } from "../../firebase";

const UsersDashboard = () => {
    // constants
    const users = useSelector((state) => state.user.users);

    useEffect(() => {
        const currentUser = auth.currentUser;
        console.log("currentUser", currentUser);

        if (currentUser) {
            const test = async () => {
                const citiesRef = collection(database, "cities");

                const docRef = doc(database, "cities", currentUser.email);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    console.log("Document data:", docSnap.data());

                    await updateDoc(doc(citiesRef, `${currentUser.email}`), {
                        email: currentUser.email,
                        userId: currentUser.uid,
                        post: "ti go ...",
                    });
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }

                // await updateDoc(doc(citiesRef, `${currentUser.email}`), {
                //     email: currentUser.email,
                //     userId: currentUser.uid,
                //     post: 123,
                // });
            };

            test();
        }
    });

    return (
        <div className='page-container'>
            {users.map((user, index) => (
                <div key={user.userId} className='user-item py-3'>
                    <h1>{user.displayName}</h1>
                    <span>{user.email}</span>
                    <div className='divider mt-2'></div>
                </div>
            ))}
        </div>
    );
};

export default UsersDashboard;

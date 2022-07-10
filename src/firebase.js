import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAMt7X5RL6ergZcLGUqWzYMdtfAefkNWXc",
    authDomain: "su-react-course.firebaseapp.com",
    databaseURL: "https://su-react-course-default-rtdb.firebaseio.com",
    projectId: "su-react-course",
    storageBucket: "su-react-course.appspot.com",
    messagingSenderId: "473048344171",
    appId: "1:473048344171:web:6838ae2287be51a59f732e",
};

const app = initializeApp(firebaseConfig);

export { app };

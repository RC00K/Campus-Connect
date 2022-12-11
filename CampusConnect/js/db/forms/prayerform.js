// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCmscDopaFUYiuijMslyVUCWcDWShpOZCw",
    authDomain: "campus-connect-a9751.firebaseapp.com",
    projectId: "campus-connect-a9751",
    storageBucket: "campus-connect-a9751.appspot.com",
    messagingSenderId: "629091341800",
    appId: "1:629091341800:web:226fab2dc102acb57c005d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const createPrayerForm = document.querySelector(".create-prayer-form");
createPrayerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addDoc(collection(db, "prayers"), {
        prayerTitle: createPrayerForm.prayerTitle.value,
        prayerInfo: createPrayerForm.prayerInfo.value,
    })
    .catch((error) => console.log(error));
        createPrayerForm.prayerTitle.value = "",
        createPrayerForm.prayerInfo.value = "",
    // clear text fields
    createPrayerForm.reset();
});
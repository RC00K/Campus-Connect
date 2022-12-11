// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getFirestore, collection, getDocs, onSnapshot, deleteDoc } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js";

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

// enableIndexedDbPersistence(db)
// .catch((err) => {
//     if (err.code == 'failed-precondition') {
//         // Multiple tabs open, persistence can only be enabled
//         // in one tab at a a time.
//         console.log("Persistente failed")
//     } else if (err.code == 'unimplemented') {
//         // The current browser does not support all of the
//         // features required to enable persistence
//         console.log("Persistente is not valid")
//     }
// });

async function getAnnouncements() {
    const announcementSnapshot = await getDocs(collection(db, "announcements"));
    const announcementList = announcementSnapshot.forEach((doc) => {
        console.log(doc.data());
    });
    return announcementList;
}
getAnnouncements();

const unsubAnnouncement = onSnapshot(collection(db, "announcements"), (doc) => {
    // console.log(doc.docChanges());
    doc.docChanges().forEach((change) => {
        // console.log(change, change.doc.data(), change.doc.id);
        if (change.type === "added") {
            // Call render function in UI
            renderAnnouncement(change.doc.data(), change.doc.id);
        }
        if (change.type === "removed") {
            // Call remove function in UI
            removeAnnouncement(change.doc.id);
        }
    });
});

// Delete an announcement
const announcementContainer = document.querySelector(".announcements");
announcementContainer.addEventListener("click", (event) => {
   if (event.target.tagName === "BUTTON") {
       const id = event.target.getAttribute("data-id");
       deleteDoc(db, "announcements", id);
   }
});
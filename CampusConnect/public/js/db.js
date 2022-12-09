// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getFirestore, collection, getDocs, onSnapshot, addDoc, deleteDoc, doc, enableIndexedDbPersistence} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

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

const auth = getAuth(app);
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getPrayers(db) {
    const prayerCol = collection(db, "prayer");
    const prayerSnapshot = await getDocs(prayerCol);
    const prayerList = prayerSnapshot.docs.map((doc) => doc);
    return prayerList;
}


async function getAnnouncements(db) {
    const announcementCol = collection(db, "announcements");
    const announcementSnapshot = await getDocs(announcementCol);
    const announcementList = announcementSnapshot.docs.map((doc) => doc);
    return announcementList;
}

enableIndexedDbPersistence(db).catch((err) => {
    if (err.code == 'failed-precondition') {
        // Multiple tabs open, persistence can only be enabled
        // in one tab at a a time.
        console.log("Persistence failed");
    } else if (err.code == 'unimplemented') {
        // The current browser does not support all of the
        // features required to enable persistence
        console.log("Persistence is not available");
    }
});

const unsub = onSnapshot(collection(db, "announcement"), (doc) => {
    // console.log(doc.docChanges());
    doc.docChanges().forEach((change) => {
        // console.log(change, change.doc.data(), change.doc.id);
        if (change.type === "added") {
            // Call render function in UI
            renderTask(change.doc.data(), change.doc.id);
        }
        if (change.type === "removed") {
            // Call remove function in UI
            removeTask(change.doc.id);
        }
    });
});

// Add new prayer
const form = documnet.querySelector("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();

    addDoc(collection(db, "prayer"), {
        name: form.name.value,
        description: form.description.value,
        request: form.request.value,
    }).catch((error) => console.log(error));
    form.name.value = "";
    form.description.value = "";
    form.request.value = "";
});

// Add new announcement
form.addEventListener("submit", (event) => {
     event.preventDefault();

     addDoc(collection(db, "announcement"), {
         title: form.title.value,
         information: form.information.value,
         time: form.time.value,
     }).catch((error) => console.log(error));
     form.title.value = "";
     form.information.value = "";
     form.time.value = "";
});

// Delete a prayer
const prayerContainer = document.querySelector(".prayer");
prayerContainer.addEventListener("click", (event) => {
    if (event.target.tagName === "I") {
        const id = event.target.getAttribute("data-id");
        deleteDoc(db, "prayer", id);
    }
});

// Delete an announcement
const announcementContainer = document.querySelector(".announcement");
announcementContainer.addEventListener("click", (event) => {
    if (event.target.tagName === "I") {
        const id = event.target.getAttribute("data-id");
        deleteDoc(db, "announcement", id);
    }
});
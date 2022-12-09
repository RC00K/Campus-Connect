import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signOut, signinWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";


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
const auth = getAuth(app);

// Listen for auth status changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User logged in: ", user.email);
        getAnnouncements(db).then((snapshot) => {
            setupAnnouncements(snapshot);
        });
        setupUI(user);
        const form = document.querySelector("form");
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
    } else {
        console.log("User logged out");
        setupUI();
        setupAnnouncements();
    }
});


// Sign Up
const signupForm = document.querySelector("#signup-form");
// const auth = getAuth(app);
signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get User Info
    const email = signupForm["signupInputEmail"].value;
    const password = signupForm["signupInputPassword"].value;
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCreadential) => {
            // Signed In
            const user = userCreadential.user;
            console.log(user);
            const modal = document.querySelector("#modal-signup");
            M.Modal.getInstance(modal).close();
            signupForm.reset();
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
    });
});


// Logout
const logout = document.querySelector("#logout");
logout.addEventListener("click", (e) => {
    e.preventDefault();
    signOut(auth).then(() => {
        console.log("User signed out");
    })
    .catch((error) => {
        // An error happened.
    });
});

// Login
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = loginForm["loginInputEmail"].value;
    const password = loginForm["loginInputPassword"].value;
    signinWithEmailAndPassword(auth, email, password).then((userCreadential) => {
        // Logged In
        const user = userCreadential.user;
        console.log(user);
        const modal = document.querySelector("#modal-login");
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    });
});
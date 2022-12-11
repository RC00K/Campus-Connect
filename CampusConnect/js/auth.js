import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";


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

const signupForm = document.querySelector(".signup-form");
signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // Get User Info
    const email = signupForm.email.value;
    const password = signupForm.email.value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            const modal = document.querySelector(".modal-signup");
            M.Modal.getInstance(modal).close();
            signupForm.requestFullscreen();
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
        });
        signupForm.reset();
});

// Logout
const logout = document.querySelector(".logout");
logout.forEach(click => {
    click.addEventListener("click", (e) => {
        e.preventDefault();
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("User signed out");
        }).catch((error) => {
            // An error happened.
            console.log("Failed to sign out");
            console.log(error.message);
        })
    })
});

// Login
const loginForm = document.querySelector(".login-form");
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = loginForm.email.value;
    const password = loginForm.password.value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user)
            const modal = document.querySelector(".modal-login");
            M.Modal.getInstance(modal).close();
            loginForm.reset();
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
        });
        loginForm.reset();
});

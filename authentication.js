import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "tpf-authorization.firebaseapp.com",
  projectId: "tpf-authorization",
  storageBucket: "tpf-authorization.appspot.com",
  messagingSenderId: "213965962272",
  appId: "APP:WEB:ID"
};

/// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const provider = new GoogleAuthProvider();

const signInButton = document.querySelector("#signInButton");
const signOutButton = document.querySelector("#signOutButton");

const firstNameField = document.querySelector("#firstName");
const lastNameField = document.querySelector("#lastName");
const emailField = document.querySelector("#exampleInputEmail1");

const userSignIn = async () => {
    signInWithPopup(auth, provider).then((result) => {
        const user = result.user;
        const displayName = user.displayName.split(' '); 
        firstNameField.value = displayName[0];
        lastNameField.value = displayName[1];
        emailField.value = user.email;
        console.log(user);
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(`Sign in failed: ${errorMessage} (Error code: ${errorCode})`);
    });
}

const userSignOut = async () => {
    signOut(auth).then(() => {
        alert("You have been signed out!");
        firstNameField.value = '';
        lastNameField.value = '';
        emailField.value = '';
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(`Sign out failed: ${errorMessage} (Error code: ${errorCode})`);
    });
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        alert("You are authenticated with Google");
        const displayName = user.displayName.split(' ');
        firstNameField.value = displayName[0];
        lastNameField.value = displayName[1];
        emailField.value = user.email;
        console.log(user);
    }
});

signInButton.addEventListener("click", userSignIn);
signOutButton.addEventListener("click", userSignOut);
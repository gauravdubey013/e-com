import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyD9gC36bDlLj6QFKzd_4uM6Tjve8BdqfnM",
  authDomain: "e-commerce-proj-final.firebaseapp.com",
  projectId: "e-commerce-proj-final",
  storageBucket: "e-commerce-proj-final.appspot.com",
  messagingSenderId: "204589096021",
  appId: "1:204589096021:web:7c80b148900eca6e5908dc",
  measurementId: "G-77M796FVBC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Registration logic here
async function register(event) {
  const username = document.getElementById("register_username").value;
  const phone = document.getElementById("register_phone").value;
  const email = document.getElementById("register_email").value;
  const password = document.getElementById("register_password").value;

  event.preventDefault();

  try {
    const authData = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await set(ref(database, `users/${authData.user.uid}`), {
      username,
      phone,
      email,
      password,
    });

    // login();
    RegForm.style.transform = "translateX(300px)";
    LoginForm.style.transform = "translateX(300px)";
    ForgotForm.style.transform = "translateX(300px)";
    alert("Registration Successful!");
  } catch (error) {
    console.error("Registration error:", error.message);
    alert(error.code);
  }
}

// login logic
function login(event) {
  const email = document.getElementById("login_email").value;
  const password = document.getElementById("login_password").value;
  event.preventDefault();

  signInWithEmailAndPassword(auth, email, password)
    .then((result) => {
      const user = result.user;
      console.log("user: ", user);
      window.location.href = "/html/index.html";
      alert("Login Successful! " + email);
    })
    .catch((error) => {
      console.log(error.code);
      alert("Login error: ", error.message);
    });
}
// Forgot-Password logic
const forgot_password = async (e) => {
  const email = document.getElementById("forgot_email").value;
  e.preventDefault();

  sendPasswordResetEmail(auth, email)
    .then((data) => {
      console.log(data);
      alert("Reset-Password Email sent!");
      RegForm.style.transform = "translateX(300px)";
      LoginForm.style.transform = "translateX(300px)";
      ForgotForm.style.transform = "translateX(300px)";
    })
    .catch((err) => {
      alert("Something went wrong: " + err.code);
    });
};
document
  .getElementById("register_btn")
  .addEventListener("click", function (event) {
    register(event);
  });
document
  .getElementById("login_btn")
  .addEventListener("click", function (event) {
    login(event);
  });
document
  .getElementById("forgot_password_btn")
  .addEventListener("click", function (event) {
    forgot_password(event);
  });

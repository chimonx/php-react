import React, { useState } from "react";
import Swal from "sweetalert2";
import { auth } from "../firebase/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import "./Login.css";

function Login({ onLoginSuccess }) {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);

    try {
      // Trigger Google Sign-In popup
      const result = await signInWithPopup(auth, provider);

      // Extract user information
      const user = result.user;

      // Save login details to Firestore
      await addDoc(collection(db, "logins"), {
        username: user.displayName || user.email,
        email: user.email,
        loginTime: new Date().toISOString(),
      });

      // Show success message
      Swal.fire({
        title: "Login Successful",
        text: `Welcome, ${user.displayName || user.email}`,
        icon: "success",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });

      // Notify parent component about login success
      onLoginSuccess(user);
    } catch (error) {
      // Show error message
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-heading">Welcome to Saman-Chat</h2>
        <p className="login-subtext">Please log in using your Google account to continue.</p>

        <button
          onClick={handleGoogleLogin}
          className="google-login-button"
          disabled={loading}
        >
          <img
            src="https://developers.google.com/identity/images/branding_guideline_sample_dk_rd_lg.svg"
            alt="Sign in with Google"
            className="google-login-image"
          />
        </button>
      </div>
    </div>
  );
}

export default Login;

import React, { useEffect, useRef, useState } from "react";
import "./Login.css";

const Login = ({ isPopupOpen, handleClose }) => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isPopupOpen) {
      usernameRef.current.value = "";
      passwordRef.current.value = "";
      setError(""); // Clear error when opening popup
    }
  }, [isPopupOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = usernameRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    if (username === "jyadmin" && password === "JymChristOne") {
      alert("Login Successful!");
      window.location.href = "/adminpanel"; // Redirect to the admin panel
    } else {
      setError("Invalid username or password!"); // Set error message
    }
  };

  return (
    <div className="login-box">
      <button className="close-btn" onClick={handleClose}>
        ✖
      </button>
      <h2>Admin Login</h2>

      {/* Display Error Message */}
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="input-box">
          <input type="text" ref={usernameRef} required />
          <label>Username</label>
        </div>
        <div className="input-box">
          <input type="password" ref={passwordRef} required />
          <label>Password</label>
        </div>
        <button type="submit" className="btn">Login</button>
      </form>
    </div>
  );
};

export default Login;

import React, { useEffect, useState } from "react";
import "./Login.css";

const Login = ({ isPopupOpen, handleClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isPopupOpen) {
      setUsername("");
      setPassword("");
      setError(""); // Clear error when opening popup
    }
  }, [isPopupOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() === "jyadmin" && password.trim() === "JymChristOne") {
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
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label>Username</label>
        </div>
        <div className="input-box">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>Password</label>
        </div>
        <button type="submit" className="btn">Login</button>
      </form>
    </div>
  );
};

export default Login;

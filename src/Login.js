import "./Login.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Retrieve stored users from localStorage
    const registeredUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Check if user exists
    const userExists = registeredUsers.some(
      (user) => user.email === email && user.password === password
    );

    if (userExists) {
       // Store logged-in user details
       const loggedInUser = registeredUsers.find(user => user.email === email);
       localStorage.setItem("user", JSON.stringify(loggedInUser));

      setAlertMessage("Login Successful!");
      setTimeout(() => navigate("/dashboard"), 1000); // Redirect after 1 sec
    } else {
      setAlertMessage("Invalid credentials! Please check your email and password.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome, pretty capybara</h2>
        <p className="social-login">Log in with</p>
        <div className="social-login">
          <a href="https://www.facebook.com/" target="_blank" className="social-icon">f</a>
          <a href="https://accounts.google.com/" target="_blank" className="social-icon">G</a>
          <a href="https://twitter.com/" target="_blank" className="social-icon">X</a>
          <a href="https://www.instagram.com/" target="_blank" className="social-icon">i</a>
        </div>

        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input 
            type="email" 
            placeholder="Enter your email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          
          <label>Password</label>
          <input 
            type="password" 
            placeholder="Enter your password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />

          {/* Forgot Password (Aligned Right) */}
          <div className="forgot-password-container">
            <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
          </div>

          <button type="submit" className="login-btn">Log in</button>
        </form>

        {/* Alert Message */}
        {alertMessage && <p className="alert-message">{alertMessage}</p>}

        {/* Register Link */}
        <p className="register-link">Don't have an account? <a href="#" onClick={() => navigate("/register")}>Register here.</a></p>
      </div>
    </div>
  );
}

export default Login;

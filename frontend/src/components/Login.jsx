import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    console.log("Login data:", { email, password });
    setError("");
    // Add your login logic here
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-title">Welcome back!</h2>
        <p className="login-subtitle">We're so excited to see you again!</p>

        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label className="form-label">Email or Phone Number</label>
          <input
            type="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <a href="#" className="forgot-password">Forgot your password?</a>
        </div>

        <button type="submit" className="login-button">
          Log In
        </button>

        <div className="login-link">
          <span className="login-link-text">
            Need an account? <Link to="/register">Register</Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
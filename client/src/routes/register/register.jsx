import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import apiRequest from "../../lib/apiRequest";

import zxcvbn from "zxcvbn"; // Import a password strength estimation library

function Register() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [password, setPassword] = useState(""); // Store password in state

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const username = e.target.username.value;
    const email = e.target.email.value;

    try {
      const strengthScore = zxcvbn(password).score; // Estimate password strength
      if (strengthScore < 2) { // Disable registration for weak passwords
        throw new Error("Password is not strong enough.");
      }

      const res = await apiRequest.post("/auth/register", {
        username,
        email,
        password,
      });

      navigate("/login");
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const strengthScore = zxcvbn(newPassword).score;
    // Set password strength based on the score
    if (strengthScore === 0 || strengthScore === 1) {
      setPasswordStrength("Very weak");
    } else if (strengthScore === 2) {
      setPasswordStrength("Fair");
    } else if (strengthScore === 3) {
      setPasswordStrength("Strong");
    } else if (strengthScore === 4) {
      setPasswordStrength("Very strong");
    }
  };

  return (
    <div className="registerPage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input
            name="username"
            type="text"
            placeholder="Username"
            required
          />
          <input name="email" type="email" placeholder="Email" required />
          <input
            name="password"
            type="password"
            placeholder="Password"
            minLength={8}
            onChange={handlePasswordChange}
            required
          />
          <div className={`passwordStrength ${passwordStrength.toLowerCase()}`}>Password Strength: {passwordStrength}</div>
          <button disabled={isLoading || passwordStrength === "very weak" || passwordStrength === "weak"}>Register</button>
          {error && <span>{error}</span>}
          <Link to="/login">Already have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register;

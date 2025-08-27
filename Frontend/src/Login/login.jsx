import { useContext, useState } from 'react';
import './login.css';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar';
import { AppContext } from '../Components/Navbar/UserInfo';
const Login = () => {
  const { user, setUser } = useContext(AppContext)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [EmailError, setEmailError] = useState("");
  const [PasswordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(`${import.meta.env.VITE_SERVR_URL}/user/login`, { email, password }, { withCredentials: true });
      setEmailError("");
      setPasswordError("");
      const res = await axios.get(`${import.meta.env.VITE_SERVR_URL}/me`, {
        withCredentials: true,
      });
      setUser(res.data);

      navigate("/")
    }
    catch (error) {
      setEmailError(error.response.data.errors.email)
      setPasswordError(error.response.data.errors.password)
    }
  };

  return <>
    <Navbar />
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Welcome Back</h2>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
            <div className="email-error">{EmailError}</div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <div className="password-error">{PasswordError}</div>
          </div>

          <div className="form-options">
            <label className="checkbox-container">
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>

          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>

        <div className="login-footer">
          <p>Don't have an account? <Link to="/user/Signup" className="signup-link">Sign Up</Link></p>
        </div>
      </div>
    </div>
  </>
};

export default Login;
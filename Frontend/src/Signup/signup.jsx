import { useContext, useState } from "react";
import "./Signup.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import { AppContext } from "../Components/Navbar/UserInfo";
import Googleauth from "../Components/GoogleAuth/Googleauth";

const Signup = () => {
  const { user, setUser } = useContext(AppContext)
  const [showPassword, setShowPassword] = useState(false);
  const [EmailError, setEmailError] = useState("");
  const [PasswordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(`${import.meta.env.VITE_SERVR_URL}/user/signup`, formData, { withCredentials: true });
      const res = await axios.get(`${import.meta.env.VITE_SERVR_URL}/me`, {
        withCredentials: true,
      });
      setUser(res.data);

      navigate("/")
    }
    catch (error) {
      setEmailError(error.response.data.errors.email);
      setPasswordError(error.response.data.errors.password)
    }
  };

  return <>

    <Navbar />
    <div className="signup">
      <div className="signup-form">
        <h2 className="title">Create Account</h2>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />

          </div>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
            <div className="email-error">{EmailError}</div>
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <div className="password-error">{PasswordError}</div>
          </div>

          <button type="submit" className="submit-btn">
            Sign Up
          </button>
          <div className="google-btn">
            <Googleauth/>
          </div>
        </form>

        <div className="links">
          <Link to="/user/Login">Already have an account? Login</Link>    </div>
      </div>
    </div>
  </>
};

export default Signup;
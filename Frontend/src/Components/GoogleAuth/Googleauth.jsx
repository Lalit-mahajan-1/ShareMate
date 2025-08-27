import React, { useContext } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { AppContext } from '../Navbar/UserInfo';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Googleauth = () => {
  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();
  const googleBtnStyles = {
    button: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      padding: "14px 16px", 
      fontSize: "16px",
      fontWeight: "500",
      cursor: "pointer",
      borderRadius: "8px", 
      border: "1px solid #bfdbfe", 
      width: "100%",
      background: "#fff",
      boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
      transition: "all 0.3s ease",
    },
    icon: {
      background: "white",
      borderRadius: "50%",
      padding: "5px",
      fontSize: "18px",
      color: "#4285F4",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    text: {
      fontSize: "15px",
      fontWeight: "700",
    }
  };




  const handlegooglelogin = async (decode) => {
    try {
      const { email, name, sub: googleId } = decode;
      await axios.post(
        `${import.meta.env.VITE_SERVR_URL}/user/google-login`,
        { email, name, googleId },
        { withCredentials: true }
      );

      const res = await axios.get(`${import.meta.env.VITE_SERVR_URL}/me`, {
        withCredentials: true,
      });

      setUser(res.data);
      navigate("/");
    } catch (error) {
      console.log("Login error:", error);
    }
  };

  const handleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            "Authorization": `Bearer ${response.access_token}`
          }
        })

        handlegooglelogin(res.data)
      } catch (err) {
        console.log(err)

      }
    },
    onError: (error) => console.log("Google login error:", error),
  });

  return (
    <div className="google-btn">
      <button onClick={handleLogin} style={googleBtnStyles.button}>
        <i className="fa-brands fa-google" style={googleBtnStyles.icon}></i>
        <span style={googleBtnStyles.text}>Sign in with Google</span>
      </button>
    </div>

  );
};

export default Googleauth;

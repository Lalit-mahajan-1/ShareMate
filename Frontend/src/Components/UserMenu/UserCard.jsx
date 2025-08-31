import { useContext, useEffect, useState } from "react";
import { AppContext } from "../Navbar/UserInfo";
import "./UserCard.css";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MonitorIcon from '@mui/icons-material/Monitor';
import axios from "axios";
const UserCard = () => {
  const { user } = useContext(AppContext);
  const [avatar, setAvatar] = useState("/UserImage.png");
   useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_SERVR_URL}/ProfileImage/${user.id}`, { withCredentials: true });
        if (res.data?.ProfURL) {
          setAvatar(res.data.ProfURL);
        }
      } catch (err) {
        setAvatar(err.response.data)
      }
    };
    if (user?.id) {
      fetchData();
    }

  }, [user])
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file && file.type === "image/png") {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESENT);
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`,
        formData
      );
      await axios.put(`${import.meta.env.VITE_SERVR_URL}/ProfileImage/${user.id}`, {
        UserId: user.id,
        ProfURL: res.data.secure_url
      }, { withCredentials: true });

      setAvatar(res.data.secure_url);
    }
  };

  return (
    <div className="user-card">
      <div className="avatar-container">
        <img src={avatar} alt="User Avatar" className="avatar" />
        <input
          type="file"
          accept="image/png"
          id="avatarInput"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
        <label htmlFor="avatarInput" className="edit-btn">
          ✏️ Edit
        </label>
      </div>

      <div className="user-info">
        <h2 className="user-name">{user?.name || "Unknown User"}</h2>
        <p className="user-email">
          <MailOutlineIcon style={{ color: 'red' }} /> {user?.email || "Not Provided"}
        </p>
        <p className="user-browser">
          <MonitorIcon /> {user?.UserBrowser}
        </p>
        <p className="user-login">
          <AccessTimeIcon /> Last Login: {user?.Date}
        </p>
      </div>
    </div>
  );
};

export default UserCard;

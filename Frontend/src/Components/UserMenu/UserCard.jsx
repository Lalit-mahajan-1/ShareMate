import { useContext, useEffect, useState } from "react";
import { AppContext } from "../Navbar/UserInfo";
import "./UserCard.css";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MonitorIcon from '@mui/icons-material/Monitor';
const UserCard = () => {
  const { user } = useContext(AppContext);
  const [avatar, setAvatar] = useState("/UserImage.png");
  useEffect(()=>{
    const fetchData = async () =>{
       if(localStorage.getItem('UserImageURL' )!==null){
        setAvatar(localStorage.getItem('UserImageURL'))
       }
    }
    fetchData();
  },[])

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "image/png") {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatar(event.target.result);
        localStorage.setItem("UserImageURL",`${event.target.result}`)
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select a PNG image.");
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
          <MailOutlineIcon style={{color:'red'}}/> {user?.email || "Not Provided"}
        </p>
        <p className="user-browser">
          <MonitorIcon/> {user?.UserBrowser}
        </p>
        <p className="user-login">
          <AccessTimeIcon/> Last Login: {user?.Date}
        </p>
      </div>
    </div>
  );
};

export default UserCard;

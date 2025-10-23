import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from '../Navbar/UserInfo';
import axios from 'axios';
import './Demo.css'; // 👈 import your CSS


export default function CustomizedMenus({ OnLogout }) {
  const navigate = useNavigate();
  const [avatar, setAvatar] = React.useState("/UserImage.png");
  const { user } = React.useContext(AppContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVR_URL}/ProfileImage/${user.id}`,
          { withCredentials: true }
        );
        if (res.data?.ProfURL) setAvatar(res.data.ProfURL);
      } catch (err) {
        setAvatar(err.response?.data || "/UserImage.png");
      }
    };
    if (user?.id) fetchData();
  }, [user]);

  return (
    <div>
      <Avatar
        style={{ cursor: 'pointer' }}
        sx={{ ml: '0.1rem', mt: '0.1rem' }}
        alt="User"
        src={avatar}
        onClick={handleClick}
      />

      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        className="custom-menu" // 👈 apply the CSS class
      >
        <MenuItem onClick={()=>{handleClose;navigate('/');}}>
          <HomeIcon sx={{ mr: 1 }} />
          <Link style={{ textDecoration: 'none', color: 'inherit' }}>
            Home
          </Link>
        </MenuItem>

        <MenuItem onClick={()=>{handleClose;navigate(`/user/Dashboard/${user.id}`);}}>
          <DashboardIcon sx={{ mr: 1 }} />
          <Link
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            Dashboard
          </Link>
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <SettingsSuggestIcon sx={{ mr: 1 }} />
          Settings
        </MenuItem>

        <Divider sx={{ my: 0.5 }} />

        <MenuItem onClick={OnLogout}>
          <LogoutIcon sx={{ mr: 1 }} />
          Log Out
        </MenuItem>
      </Menu>
    </div>
  );
}

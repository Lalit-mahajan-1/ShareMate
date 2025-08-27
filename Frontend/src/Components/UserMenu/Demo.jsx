import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import LogoutIcon from '@mui/icons-material/Logout';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { AppContext } from '../Navbar/UserInfo';
import HomeIcon from '@mui/icons-material/Home';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: 'rgb(55, 65, 81)',
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
        ...theme.applyStyles('dark', {
          color: 'inherit',
        }),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
    ...theme.applyStyles('dark', {
      color: theme.palette.grey[300],
    }),
  },
}));

export default function CustomizedMenus({ OnLogout }) {

  const{user,setUser} = React.useContext(AppContext)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
   
        {
          localStorage.getItem('UserImageURL')?<Avatar  style ={{cursor:'pointer'}} sx ={{ml:'0.1rem',mt:'0.1rem'}}alt="Remy Sharp" src={localStorage.getItem('UserImageURL')} onClick={handleClick} />:
          <Avatar  style ={{cursor:'pointer'}} sx ={{ml:'0.1rem',mt:'0.1rem'}}alt="Remy Sharp" src="/UserImage.png" onClick={handleClick} />
        }
      


      <StyledMenu
        id="demo-customized-menu"
        slotProps={{
          list: {
            'aria-labelledby': 'demo-customized-button',
          },
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      > 
      <MenuItem onClick={handleClose} disableRipple>
          <HomeIcon to="/"/>
          <Link to="/"style={{textDecoration:'none',color:'inherit'}}>Home</Link>
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <DashboardIcon />
          <Link to= {`/user/Dashboard/${user.id}`}style={{textDecoration:'none',color:'inherit'}}>Dashboard</Link>
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <SettingsSuggestIcon />
          Settings
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={OnLogout} disableRipple>
          <LogoutIcon />
          Log Out
        </MenuItem>
      </StyledMenu>
    </div>
  );
}

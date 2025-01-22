import { Link, useLocation } from "react-router-dom";
import logo from "../../Assets/Images/logo.svg";
import { useAuth } from "../../contexts/AuthContext";
import { Menu, MenuItem, IconButton } from "@mui/material";
import { useState } from "react";
import { Icons } from "../Icons/Icons";
import "./Header.scss";

export const Header = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const noHeaderPaths = ['/sign-in', '/sign-up', '/forgot-password'];

  if (noHeaderPaths.includes(location.pathname)) {
    return null;
  }

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <header className="header">
      <div className="wrap">
        <Link to="/" className="text-logo">
          lookthis
        </Link>
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="menu">
          {user && (
            <div className="user">
              <img src={user.avatar_url} alt="avatar" />
              <span>{user.username}</span>
            </div>
          )}
          <IconButton className={`menu-icon ${anchorEl ? 'active' : ''}`} onClick={handleMenuOpen}>
            {Icons.MenuIcon}
            {Icons.CloseIcon}
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem component={Link} to="/settings" onClick={handleMenuClose}>
              Settings
            </MenuItem>
            <MenuItem onClick={() => {
              handleMenuClose();
              logout();
            }}>
              Logout
            </MenuItem>
          </Menu>
        </div>
      </div>
    </header>
  );
};

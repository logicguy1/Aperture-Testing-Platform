import { Box, IconButton, useTheme, Typography, Tooltip, Breadcrumbs } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme.js";
import { useNavigate, Link } from "react-router-dom";

import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import logo from "../../assets/img/aperture-letter-logo.svg"

import { HeadContext } from '../../context/HeadContext';
import { AuthContext } from '../../context/AuthContext';

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();

  const headSettings = useContext(HeadContext);
  const auth = useContext(AuthContext);
  console.log(headSettings)
  const headerStyle = {
    transform: "skew(-20deg)",
    width: "150px",
    height: "50px",
    position: "absolute",
    left: "-10px",
    top: 0,
    padding: "10px",
    paddingLeft: "20px",
    display: "flex",
    alignItems: "center",
    color: colors.grey[900],
  };

  return (
    <>
      <Box 
        display="flex" 
        justifyContent="space-between" 
        pr={2}
        alignItems="center"  
        top="0"
        position="sticky"
        backgroundColor={colors.primary[400]}
        borderBottom={`1px ${colors.borderColor} solid`}
        zIndex="1200"
        height="51px"
      >
        {/* TITLE TEXT */}
        <Box display="flex">
          <Box
            sx={{...headerStyle, paddingLeft: "30px", backgroundColor: "#080942", transform: "skew(20deg)"}}
          >
            <img src={logo} alt="Logo" style={{ maxHeight: 40, width: "auto"}} />
          </Box>
          <Box
            sx={{...headerStyle, left: "139px", backgroundColor: "#221c69"}}
          >
            <Typography sx={{transform: "skew(20deg)"}}>
              Home
            </Typography>
          </Box>
          <Box
            sx={{...headerStyle, left: "278px", backgroundColor: colors.redAccent[400], cursor: "pointer"}}
            onClick={() => {navigate("/")}}
          >
            <Typography sx={{transform: "skew(20deg)"}}>
              Dashboard
            </Typography>
          </Box>
        </Box>

        {/* ICONS */}
        <Box display="flex">
          <Tooltip title={`Go to ${theme.palette.mode === 'dark' ? 'light' : 'dark'} theme`}>
            <IconButton onClick={colorMode.toggleColorMode}>
              {theme.palette.mode === "dark" ? (
                <DarkModeOutlinedIcon />
              ) : (
                <LightModeOutlinedIcon />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip title="Account settings">
            <IconButton onClick={() => {navigate("/settings")}}>
              <ManageAccountsOutlinedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Log ud">
            <IconButton onClick={() => {auth.setToken(null); navigate("/")}}>
              <LogoutOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Box>

      </Box>
    </>
  )
}

export default Topbar;


import { Box, IconButton, useTheme, Typography, Tooltip, Breadcrumbs } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme.js";
import { useNavigate, Link } from "react-router-dom";

import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

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

  return (
    <>
      <Box 
        display="flex" 
        justifyContent="space-between" 
        p={1} 
        pl={3}
        pr={2}
        alignItems="center"  
        width="-webkit-fill-available"
        top="0"
        position="sticky"
        backgroundColor={theme.palette.mode === 'dark' ? colors.primary[500] : "#fcfcfc"}
        zIndex="1200"
      >
        {/* TITLE TEXT */}
        <Breadcrumbs aria-label="breadcrumb">
          {headSettings.data.location.map((item, index) => (
            <Typography key={item} color={index === headSettings.data.location.length-1 ? colors.grey[200] : "unset"}>{item}</Typography>
          ))}
        </Breadcrumbs>

        {/* ICONS */}
        <Box display="flex">
          <Tooltip title={`Gå til ${theme.palette.mode === 'dark' ? 'lyst' : 'mørkt (eksperimentelt)'} tema`}>
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
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


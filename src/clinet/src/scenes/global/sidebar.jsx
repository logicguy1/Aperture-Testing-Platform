import { useState, useContext, useEffect } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
// import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme.js";

import "react-pro-sidebar/dist/css/styles.css";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

import { AuthContext } from '../../context/AuthContext';
import PersonOutlineOutlined from "@mui/icons-material/PersonOutlineOutlined";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = ({ setExpanded }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const auth = useContext(AuthContext);
  console.log("auth", auth)

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  useEffect(() => {
    setExpanded(isCollapsed);
  }, [isCollapsed])

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        height: "100vh",
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 10px !important",
        },
        "& .pro-inner-item": {
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
          fill: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
          fill: "#6870fa !important",
        },
      }}
    >
    
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
            sx={{
              "&*": {fill: colors.grey[100]},
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {/* USER */}
          {!isCollapsed && (
            <Box mb="25px">
              {/*<Box display="flex" justifyContent="center" alignItems="center">
                <img 
                  alt="Profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/user.png`}
                  style={{ cursor: "pointer", borderRadius: "50%"}}
            />
              </Box>*/}

              <Box textAlign="center" mt={6} mb={6}>
                <Typography 
                  variant="h2" 
                  color={colors.grey[100]} 
                  fontWeight="bold" 
                  sx={{ m: "10px 0 0 0"}}
                >
                  {auth.token.level !== "volunteer" ? (
                    auth.token.user[0].toUpperCase() + auth.token.user.substring(1)
                  ) : (
                    auth.token.name
                  )}
                </Typography>
              </Box>
            </Box>
          )}

          {/* MENU ITEMS */}
          <Box paddingLeft={isCollapsed ? undefined : "3%"}>
            <Item 
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  )
}

export default Sidebar;

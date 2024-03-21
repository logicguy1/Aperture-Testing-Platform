import React, { useState, useEffect, useContext, useCallback } from "react";
import { Typography, useTheme, Chip , Box, Popover, Card, Avatar, IconButton } from "@mui/material";
import { tokens } from "../theme.js";

import Person2 from '@mui/icons-material/Person2';
import LaunchIcon from '@mui/icons-material/Launch';
import { useNavigate, Link } from "react-router-dom";

import Phone from "./phone";

const Person = ({ id, name, tlf, notes, color, sx }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    if (name) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const idx = open ? 'simple-popover' : undefined;

  return (
    <>
      <Box
        height="25px"
        backgroundColor={color ? color : colors.primary[400]}
        p="5px"
        pl="10px"
        pr="10px"
        borderRadius="5px"
        onClick={handleClick}
        sx={{ cursor: name ? "pointer" : "", ...sx }}
      > 
        <Typography 
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          overflow="hidden"
          fontWeight={500}
          lineHeight="15px"
          fontSize="12.5px"
        >{name}</Typography>
      </Box>
      <Popover
        id={idx}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Card style={{
          borderColor: colors.grey[800],
          padding: 10,
          minWidth: "300px",
        }} variant="outlined">
          <Box display="flex" justifyContent="space-between">
            <Box display="flex" gap="5px">
              <Box mb={1}>
                <Avatar sx={{ bgcolor: colors.greenAccent[500], marginRight: 1 }} aria-label="recipe">
                  {name ? name.slice(0,1) : "-"}
                </Avatar>
              </Box>
              <Box>
                <Typography 
                  fontWeight={500}
                >{name} ({id})</Typography>
                <Phone number={tlf} props={{ fontWeight: 200 }} />
              </Box>
            </Box>
            <Box>
              <IconButton onClick={() => {navigate(`/people/${id}`)}}>
                <LaunchIcon />
              </IconButton>
            </Box>
          </Box>
          <Card style={{
            borderColor: colors.grey[800],
            backgroundColor: colors.primary[400],
            padding: 10,
            width: "300px",
          }} variant="outlined">
            <Typography 
              fontWeight={500}
            >{notes ? notes : "Ingen notater"}</Typography>
          </Card>
        </Card>
      </Popover>
    </>
  )
};

export default Person;

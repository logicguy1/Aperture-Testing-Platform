import React, { useState, useEffect, useContext, useCallback } from "react";
import { Typography, useTheme, Chip , Box, Popover, Card, Avatar } from "@mui/material";
import { tokens } from "../theme.js";

import Person2 from '@mui/icons-material/Person2';

const Phone = ({ number, props }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  if (!number) {
    return (
      <Typography 
        {...props}
      >Intet nummer</Typography>
    )
  }

  const part1 = number.substring(0, 2);
  const part2 = number.substring(2, 4);
  const part3 = number.substring(4, 6);
  const part4 = number.substring(6, 8);

  const formatted = `${part1} ${part2} ${part3} ${part4}`

  return (
    <>
      <Typography 
        {...props}
      >{formatted}</Typography>
    </>
  )
};

export default Phone;

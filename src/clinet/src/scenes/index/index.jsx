import { Box, Button, IconButton, Typography, useTheme, Table, TextField, Card } from "@mui/material";
import { tokens, themeSettings } from "../../theme";
import { useState, useEffect, useContext } from "react";

import { AuthContext } from '../../context/AuthContext';
import { HeadContext } from "../../context/HeadContext";

import config from "../../config";

const Index = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const auth = useContext(AuthContext);
  const head = useContext(HeadContext);

  const [data, setData] = useState([]);

  useEffect(() => {
    head.setData({location: ["Dashboard"]});
  }, [])

  return (
    <>
      <Box 
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"

      >
        Hi :)
      </Box>
    </>
  )
}

export default Index;

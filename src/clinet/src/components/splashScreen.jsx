import React, { useState, useEffect, useContext, useCallback } from "react";
import { Typography, useTheme, Chip , Box, Popover, Card, Avatar } from "@mui/material";
import { tokens } from "../theme.js";
import { LineChart } from '@mui/x-charts/LineChart';

import config from "../config";

const Splash = ({ benchmarkid, name, description, onclick }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [bell, setBell] = useState({ world: [], user: [], friends: [] });

  // Get the bell
  useEffect(() => {
    fetch(
      `${config.baseurl}/benchmarks/get`,
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          id: benchmarkid,
        })
      }
    ).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse the response JSON
    }).then(data => {
      console.log(data)
      setBell(data.data.bell);
    })
  }, [])

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="center" flex="1" gap="2em" flexDirection="column">
        <Box display="flex" gap="2em">
          <Box
            sx={{ boxShadow: 1 }}
            p="2em"
            width="435px"
            height="255px"
            backgroundColor={colors.primary[400]}
          >
            <Typography variant="h1" pb="20px">{name}</Typography>
            <Typography>{description}</Typography>
          </Box>
          <Box 
            sx={{ boxShadow: 1 }}
            width="435px"
            height="255px"
            backgroundColor={colors.greenAccent[500]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            style={{ cursor: "pointer" }}
            onClick={onclick}
          >
            <Typography variant="h1">Get started</Typography>
          </Box>
        </Box>
        <Box width="900px" height="250px">
          <LineChart
            xAxis={[{ data: bell.world.map(i => i.value), angle: 80, textAnchor: 'start', }]}
            series={[
              {
                data: bell.world.map(i => i.count),
                showMark: false,
                label: "% the world",
              },
              {
                data: bell.user.map(i => i.count),
                showMark: false,
                label: "% the you",
              },
              {
                data: bell.friends.map(i => i.count),
                showMark: false,
                label: "% of friends",
              },
            ]}
          />
        </Box>
      </Box>
    </>
  )
};

export default Splash;

import { Box, Button, IconButton, Typography, useTheme, Table, TextField, Card, Avatar, ButtonBase } from "@mui/material";
import { tokens, themeSettings } from "../../theme";
import { useState, useEffect, useContext } from "react";
import { DataGrid, GridFooter } from '@mui/x-data-grid';
import { LineChart } from '@mui/x-charts/LineChart';

import { AuthContext } from '../../context/AuthContext';
import { HeadContext } from "../../context/HeadContext";

import config from "../../config";

const ReactionGame = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const auth = useContext(AuthContext);
  const head = useContext(HeadContext);

  const [scores, setScores] = useState([]);
  const [turn, setTurn] = useState(0);
  const [startTime, setStartTime] = useState(-1);
  const [isStarted, setIsStarted] = useState(false);
  const [isShownSplash, setIsShownSplash] = useState(true);
  const [isClicked, setIsClicked] = useState(false);

  const [bell, setBell] = useState({ world: [], user: [], friends: [] });

  // Sets the start time when the game starts
  useEffect(() => {
    if (isStarted) {
      setStartTime(+new Date());
    }
  }, [isStarted])

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
          id: 2,
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

  // Save the users score
  useEffect(() => {
    if (scores.length === 5) {
      setIsStarted(false);
      fetch(
        `${config.baseurl}/benchmarks/save`,
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            id: 2,
            score: scores.reduce((a, b) => a + b) / scores.length
          })
        }
      ).then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the response JSON
      })
    }
  }, [scores])

  const run_level = () => {
    setIsClicked(false);
    setTimeout(() => {
      setIsClicked(true);
      setStartTime(+new Date());
    }, 3000)
  }

  if (isShownSplash) {
    return <>
      <Box display="flex" alignItems="center" justifyContent="center" flex="1" gap="2em" flexDirection="column">
        <Box display="flex" gap="2em">
          <Box
            sx={{ boxShadow: 1 }}
            p="2em"
            width="435px"
            height="255px"
            backgroundColor={colors.primary[400]}
          >
            <Typography variant="h1" pb="20px">Reaction Test</Typography>
            <Typography>The reaction test is about testing your reaction speed, when the screen becomes green, click it as fast as possible, and your score is noted</Typography>
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
            onClick={() => { setIsShownSplash(false) }}
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
  }

  // The game is over
  if (scores.length === 5) {
    return (
      <>
        <Box display="flex" alignItems="center" justifyContent="center" flex="1" flexDirection="column">
          <Box
            sx={{ boxShadow: 1 }}
            width="1135px"
            height="755px"
            backgroundColor={colors.greenAccent[500]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            style={{ cursor: "pointer" }}
            onClick={() => { setScores([]); run_level(); setIsStarted(true) }}
          >
            <Typography variant="h1">{scores.reduce((a, b) => a + b) / scores.length} ms</Typography>
          </Box>
        </Box>
      </>
    )
  }

  // The game has not been initiated yet
  if (!isStarted) {
    return (
      <>
        <Box display="flex" alignItems="center" justifyContent="center" flex="1" flexDirection="column">
          <Box
            sx={{ boxShadow: 1 }}
            width="1135px"
            height="755px"
            backgroundColor={colors.greenAccent[500]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            style={{ cursor: "pointer" }}
            onClick={() => { setIsStarted(true); run_level(); }}
          >
            <Typography variant="h1">Click to start</Typography>
          </Box>
        </Box>
      </>
    )
  }

  // The game is running
  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="center" flex="1" flexDirection="column">
        <Typography>{scores.length} {+new Date() - startTime} ms</Typography>
        <Box
          p="0 75px 75px 0"
          sx={{ boxShadow: 1 }}
          width="1135px"
          height="755px"
          backgroundColor={!isClicked ? colors.redAccent[400] : colors.greenAccent[400]}
          onClick={() => {
            if (isClicked) {
              setScores([...scores, +new Date() - startTime]); setIsClicked(false); run_level()
            } else {
              alert("Too early!")
            }
          }}
        >
        </Box>
      </Box>
    </>
  )
}

export default ReactionGame;

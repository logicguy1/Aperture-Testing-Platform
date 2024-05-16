import { Box, Button, IconButton, Typography, useTheme, Table, TextField, Card, Avatar, ButtonBase } from "@mui/material";
import { tokens, themeSettings } from "../../theme";
import { useState, useEffect, useContext } from "react";
import { DataGrid, GridFooter } from '@mui/x-data-grid';
import { LineChart } from '@mui/x-charts/LineChart';

import { AuthContext } from '../../context/AuthContext';
import { HeadContext } from "../../context/HeadContext";

import config from "../../config";

const Circ = ({ pos, active, onClick }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      height={`${pos.size}%`}
      width="auto"
      borderRadius="1000px"
      backgroundColor={!active ? colors.redAccent[500] : colors.greenAccent[500]}
      position="absolute"
      top={`${pos.y}%`}
      left={`${pos.x}%`}
      onClick={onClick}
      style={{
        cursor: "pointer",
        aspectRatio: "1 / 1"
      }}
    >
    </Box>
  )
}

const AimGame = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const auth = useContext(AuthContext);
  const head = useContext(HeadContext);

  const [balls, setBalls] = useState([]);
  const [turn, setTurn] = useState(0);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(-1);
  const [isStarted, setIsStarted] = useState(false);
  const [isShownSplash, setIsShownSplash] = useState(true);

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
          id: 3,
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
    if (turn === 5) {
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
            id: 3,
            score: ((+new Date() - startTime) / 5)
          })
        }
      ).then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the response JSON
      })
    }
  }, [turn])

  // Generate the balls when they all have been clicked
  useEffect(() => {
    setScore(turn * 5 + balls.filter(i => i.active).length);
    if (balls.every(i => i.active)) {
      setTurn(turn + 1);
      // Generate a list of balls
      let newPos, newSize, overlapping;
      let tmpBalls = [];
      let attempts = 0;

      for (let i = 0; i < 5; i++) {
        do {
          // Generate random position and size for the ball
          newPos = {
            x: Math.random() * 100,
            y: Math.random() * 100
          };
          newSize = Math.random() * 10 + 12;

          // Check if the newly generated ball overlaps with any existing ball
          overlapping = tmpBalls.some(ball => {
            const dx = newPos.x - ball.pos.x;
            const dy = newPos.y - ball.pos.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const minDistance = newSize + ball.pos.size / 2;
            return distance < minDistance;
          });
          attempts++;
          // Repeat the process until the ball doesn't overlap with any existing ball
        } while (overlapping && attempts < 100);
        if (attempts < 100) {
          tmpBalls.push({
            idx: i,
            pos: { ...newPos, size: newSize },
            active: false
          });
        }
      }
      setBalls(tmpBalls);
    }
  }, [balls])

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
            <Typography variant="h1" pb="20px">Aim Test</Typography>
            <Typography>The goal of the aimgame is to test your hand-eye coordination skills, click the 5 shown targets as fast as posible, your final score is the average time it takes you to clear a screen.</Typography>
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
  if (turn === 5) {
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
            onClick={() => { setTurn(0); setScore(0); setIsStarted(true) }}
          >
            <Typography variant="h1">{(+new Date() - startTime) / 5} ms</Typography>
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
            onClick={() => { setIsStarted(true) }}
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
        <Typography>{turn}-{score} {+new Date() - startTime} ms</Typography>
        <Box
          p="0 75px 75px 0"
          sx={{ boxShadow: 1 }}
          width="1135px"
          height="755px"
        >
          <Box
            width="1000px"
            height="600px"
            display="flex"
            justifyContent="space-evenly"
            alignItems="space-evenly"
            position="relative"
          >
            {balls.map((i) => (
              <Circ key={i.idx} pos={i.pos} active={i.active} onClick={() => { setBalls([...balls.filter((ball) => (ball !== i)), { ...i, active: true }]) }} />
            ))}
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default AimGame;

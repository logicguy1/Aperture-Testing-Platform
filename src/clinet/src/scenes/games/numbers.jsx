import { Box, Button, IconButton, Typography, useTheme, Table, TextField, Card, Avatar, ButtonBase, LinearProgress } from "@mui/material";
import { tokens, themeSettings } from "../../theme";
import { useState, useEffect, useContext, useRef } from "react";
import { DataGrid, GridFooter } from '@mui/x-data-grid';
import Splash from "../../components/splashScreen"

import { AuthContext } from '../../context/AuthContext';
import { HeadContext } from "../../context/HeadContext";

import config from "../../config";

function genRandomNumber(length) {
  // Generate a random number with the specified length
  let randomNumber = '';
  for (let i = 0; i < length; i++) {
      randomNumber += Math.floor(Math.random() * 10);
  }
  return randomNumber;
}

const NumberGame = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const auth = useContext(AuthContext);
  const head = useContext(HeadContext);

  const inputRef = useRef(null);

  const [score, setScore] = useState(-1);
  const [turn, setTurn] = useState(0);
  const [isFailed, setIsFailed] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isShownSplash, setIsShownSplash] = useState(true);
  const [isClicked, setIsClicked] = useState(true);
  const [shownNumber, setShownNumber] = useState(-1);

  const [count, setCount] = useState(0);

  // Save the users score
  useEffect(() => {
    if (isFailed) {
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
            id: 4,
            score: score
          })
        }
      ).then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the response JSON
      })
    }
  }, [isFailed])

  useEffect(() => {
    if (score != -1) {
      setIsClicked(true);
      setCount(0);
      setShownNumber(genRandomNumber(score));

      setTimeout(() => {setCount(.5);}, 500);
      setTimeout(() => {setCount(1);}, 1000);
      setTimeout(() => {setCount(1.5);}, 1500);
      setTimeout(() => {setCount(2);}, 2000);
      setTimeout(() => {setCount(2.5);}, 2500);
      setTimeout(() => {setCount(3);}, 3000);

      setTimeout(() => {
        setIsClicked(false);
      }, 3500)
    }
  }, [score]);

  useEffect(() => {
    console.log(inputRef)
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
  }, [inputRef])

  if (isShownSplash) {
    return <Splash
      benchmarkid={4}
      name="Numbers Test"
      description="The goal of this test is to memorize as long a sequence of numbers of possible. You are first given one number which will increase for each round."
      onclick={() => {setIsShownSplash(false)}} 
    />
    
  }

  // The game is over
  if (isFailed) {
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
            onClick={() => {setScore(1); setIsStarted(true); setIsFailed(false)}}
          >
            <Typography variant="h1">{score} numbers</Typography>
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
            onClick={() => { setIsStarted(true); setScore(1); }}
          >
            <Typography variant="h1">Start</Typography>
          </Box>
        </Box>
      </>
    )
  }

  // The game is running
  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="center" flex="1" flexDirection="column">
        {isClicked === true ? 
          <>
            <Typography variant="h1">{shownNumber}</Typography> 
            <Box width="200px">
              <LinearProgress variant="determinate" value={count/3*100} />
            </Box>
          </>        
        :
          <TextField
            ref={inputRef}
            label="Type number here"
            variant="outlined"
            onLoad={(e) => {console.log(e)}}
            onChange={(e) => {
              if (e.target.value.length === score) {
                if (e.target.value == shownNumber) {
                  setScore(score + 1);
                } else {
                  alert("cry");
                  setIsFailed(true);
                }
              }
            }}
            style={{
              width: "300px",
              marginTop: "15px",
              marginBottom: "23px"
            }}
          />
        }
      </Box>
    </>
  )
}

export default NumberGame;

import { Box, Button, IconButton, Typography, useTheme, Table, TextField, Card, Avatar, ButtonBase, LinearProgress } from "@mui/material";
import { tokens, themeSettings } from "../../theme";
import { useState, useEffect, useContext, useRef } from "react";
import { DataGrid, GridFooter } from '@mui/x-data-grid';
import Splash from "../../components/splashScreen"

import { AuthContext } from '../../context/AuthContext';
import { HeadContext } from "../../context/HeadContext";

import { save_game } from "../../utils/games";

import config from "../../config";

function arraysHaveUniqueItems(array1, array2) {
    const arr1 = array1.filter(item => !array2.includes(item));
    const arr2 = array2.filter(item => !array1.includes(item));

    return arr1.length > 0 || arr2.length > 0;
}

function generateRandomNumbers(x, y) {
    // Create an array with numbers from 0 to y
    let numbersArray = [];
    for (let i = 0; i <= y; i++) {
        numbersArray.push(i);
    }

    // Shuffle the array
    for (let i = numbersArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbersArray[i], numbersArray[j]] = [numbersArray[j], numbersArray[i]];
    }

    // Select the first x numbers
    return numbersArray.slice(0, x);
}

function Grid({ width, height, marked, setMarked }) {
  // Generate rows and columns of squares
  const squares = [];
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const key = `${row}-${col}`;
      squares.push(
        <Box 
          key={key} 
          width="55px" 
          height="55px" 
          backgroundColor={marked.includes((row*width)+col) ? "#f00" : "#f1f1f1"} 
          border="2px #fff solid "
          onClick={() => setMarked(m => [...m, (row*width)+col])}
        ></Box>
      );
    }
  }

  // Return the grid
  return (
    <Box width='100%' height='100%' display="grid" gridTemplateColumns={"1fr ".repeat(width)} gridTemplateRows={"1fr ".repeat(height)}>
      {squares}
    </Box>
  );
}

const SimonGame = () => {
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
  const [shownNumber, setShownNumber] = useState([]);
  const [selected, setSelected] = useState([]);

  const [height, setHeight] = useState(3);
  const [width, setWidth] = useState(3);

  // Save the users score
  useEffect(() => {
    if (isFailed) {
      setIsStarted(false);
      save_game(6, score);
    }
  }, [isFailed])

  // the score has updated
  useEffect(() => {
    if (score != -1) {
      setIsClicked(true);
      setWidth(Math.floor(score*0.5 + 3))
      setHeight(Math.floor(score*0.5 + 3))
      setShownNumber(generateRandomNumbers(score + 3, height*width-1));

      setTimeout(() => {
        setIsClicked(false);
      }, 3500)
    }
  }, [score]);

  // The user selects a new tile
  useEffect(() => {
    if (selected.length === score + 3) {
      // The user failed to repeat
      if (arraysHaveUniqueItems(selected, shownNumber)) {
        setSelected([]);
        setShownNumber([]);
        setHeight(3);
        setWidth(3);
        setIsFailed(true);
        return;
      }
      setSelected([]);
      setScore(i => i+1);
    }
  }, [selected])

  if (isShownSplash) {
    return <Splash
      benchmarkid={6}
      name="Simon Says"
      description="The goal of this game is to repeat as many patterns that appear on the screen as possible."
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
            <Typography variant="h1">{score} patterns</Typography>
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
        {isClicked === true ? 
          <>
            <Box>
              <Grid width={width} height={height} marked={shownNumber} setMarked={() => {}} />
            </Box>
          </>        
        :
          <>
            <Box>
              <Grid width={width} height={height} marked={selected} setMarked={setSelected} />
            </Box>
          </>
        }
      </Box>
    </>
  )
}

export default SimonGame;

import { Box, Button, IconButton, Typography, useTheme, Table, TextField, Card, Avatar, ButtonBase, LinearProgress } from "@mui/material";
import { tokens, themeSettings } from "../../theme";
import { useState, useEffect, useContext, useRef } from "react";
import { DataGrid, GridFooter } from '@mui/x-data-grid';
import Splash from "../../components/splashScreen"

import { AuthContext } from '../../context/AuthContext';
import { HeadContext } from "../../context/HeadContext";

import config from "../../config";

const TypingGame = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const auth = useContext(AuthContext);
  const head = useContext(HeadContext);

  const inputRef = useRef(null);
  const [score, setScore] = useState(-1);
  const [isFailed, setIsFailed] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isShownSplash, setIsShownSplash] = useState(true);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [progress, setProgress] = useState(0);
  const [randomText, setRandomText] = useState("");
  const [isWrong, setIsWrong] = useState(false);

  const texts = [
    'In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends of worms and an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down on or to eat: it was a hobbit-hole, and that means comfort.',
    'Just before tea-time there came a tremendous ring on the front-door bell, and then he remembered! He rushed and put on the kettle, and put out another cup and saucer, and an extra cake or two, and ran to the door.',
    'Finally, after many trials and tribulations, Frodo reached Mount Doom. With the Ring weighing heavy on his conscience, he climbed the fiery slopes and cast the Ring into the flames, destroying it forever.',
    "In the Hundred Acre Wood, nestled deep in the heart of the forest, there lived a bear named Winnie the Pooh. Pooh wasn't very clever, but he had a big heart and a love for honey that knew no bounds.",
    'Frodo Baggins, a hobbit of the Shire, was chosen to bear the Ring and destroy it in the fires of Mount Doom. With his faithful friend Samwise Gamgee by his side, he embarked on a perilous journey across Middle-earth.'
  ];

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * texts.length);
    setRandomText(texts[randomIndex]);
  }, []);

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
            id: 1,
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
    console.log(inputRef)
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
  }, [inputRef])

  const handleTyping = (event) => {
    const typed = event.target.value;
    setTypedText(typed);
    if (!startTime) {
      setStartTime(Date.now());
    }

    if (!randomText.startsWith(typed)) {
      setIsWrong(true);
      console.log("Yessir", isWrong)
    } else {
      setIsWrong(false);
      console.log("Nahh", isWrong)
    }
    
    // calculates the WPM based on typed text length and time elapsed
    const timeElapsedInSeconds = (Date.now() - startTime) / 1000;
    const typedWords = typed.trim().split(/\s+/).length;
    const totalWords = randomText.trim().split(/\s+/).length;
    const wpm = Math.round((typedWords / timeElapsedInSeconds) * 60);
    setProgress((typedWords / totalWords) * 100);

    setScore(wpm);
  
    // checks if the typed text matches the random text
    if (typed === randomText) {
      setEndTime(Date.now());
      if (typedWords === totalWords) {
        setIsFailed(true); //all words have been typed correctly
      } else {
        setIsFailed(false); // some words are still left
      }
    }
  };

  // Splash screen
  if (isShownSplash) {
    return <Splash
      benchmarkid={1}
      name="Typing Test"
      description="This is a typing test where you are presented a text and you have to type it as quickly and accurately as possible. You are tested on how many wpm (words per minute) you can type."
      onclick={() => 
        {setIsShownSplash(false)}} 
    />
    
  }

  // The game is over
  if (isFailed) {
    return (
      <>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flex="1"
          flexDirection="column"
        >
          <Box
            sx={{ boxShadow: 1 }}
            width="1135px"
            height="755px"
            backgroundColor={colors.greenAccent[500]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setScore(1);
              setIsStarted(true);
              setIsFailed(false);
            }}
          >
            <Typography variant="h1">{score} wpm</Typography>
          </Box>
        </Box>
      </>
    );
  }

  // The game has not been initiated yet
  if (!isStarted) {
    return (
      <>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flex="1"
          flexDirection="column"
        >
          <Box
            sx={{ boxShadow: 1 }}
            width="1135px"
            height="755px"
            backgroundColor={colors.greenAccent[500]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setIsStarted(true);
              setScore(1);
            }}
          >
            <Typography variant="h1">Click to start</Typography>
          </Box>
        </Box>
      </>
    );
  }

  // The game is running
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flex="1"
        direction="column"
      >
        <Box
          p="0 75px 75px 0"
          sx={{ 
          boxShadow: 1,
          userSelect: "none",
          width:"1135px",
          height:"755px",
          textAlign:"center",
          flexDirection:"column",
          alignitems:"center",
          justifyContent:"center"
          }}
        >
          <Typography variant="h2">WPM: {score}</Typography>
          <LinearProgress variant="determinate" value={progress} />
          <Typography sx={{margin: "12px"}} variant="h5">{randomText}</Typography>
          <TextField
            ref={inputRef}
            autoFocus={true}
            type="text"
            onChange={handleTyping}
            value={typedText}
            style={{ backgroundColor: isWrong ? colors.redAccent[800] : colors.primary[500], width: "100%", padding: "2em" }}
          />
          <Box
            width="1000px"
            height="600px"
            display="flex"
            justifyContent="space-evenly"
            alignItems="space-evenly"
            position="relative"
          ></Box>
        </Box>
      </Box>
    </>
  );
};

export default TypingGame;

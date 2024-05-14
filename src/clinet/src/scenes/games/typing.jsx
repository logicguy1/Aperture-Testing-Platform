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
    `You never read a book on psychology, Tippy. You didn't need to. You knew by some divine instinct that you can make more friends in two months by becoming genuinely interested in other people than you can in two years by trying to get other people interested in you.`,
    `I know more about the private lives of celebrities than I do about any governmental policy that will actually affect me. I'm interested in things that are none of my business, and I'm bored by things that are important to know.`,
    `A spider's body consists of two main parts: an anterior portion, the prosoma (or cephalothorax), and a posterior part, the opisthosoma (or abdomen).`,  
    `As customers of all races, nationalities, and cultures visit the Dekalb Farmers Market by the thousands, I doubt that many stand in awe and contemplate the meaning of its existence. But in the capital of the Sunbelt South, the quiet revolution of immigration and food continues to upset and redefine the meanings of local, regional, and global identity.`,
    `Outside of two men on a train platform there's nothing in sight. They're waiting for spring to come, smoking down the track. The world could come to an end tonight, but that's alright. She could still be there sleeping when I get back.`,
    `I'm a broke-nose fighter. I'm a loose-lipped liar. Searching for the edge of darkness. But all I get is just tired. I went looking for attention. In all the wrong places. I was needing a redemption. And all I got was just cages.`
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
            <Typography variant="h1">Start</Typography>
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
          sx={{ boxShadow: 1 }}
          width="1135px"
          height="755px"
          textAlign="center"
          flexDirection="column"
          alignitems="center"
          justifyContent="center"
        >
          <Typography>WPM: {score}</Typography>
          <LinearProgress variant="determinate" value={progress} />
          <p className="text">{randomText}</p>
          <TextField
            ref={inputRef}
            type="text"
            onChange={handleTyping}
            value={typedText}
            style={{ backgroundColor: isWrong ? colors.redAccent[800] : colors.primary[500] }}
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

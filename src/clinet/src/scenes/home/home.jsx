import { Paper, Checkbox, FormControlLabel, Link, CardContent, CardActions, CardMedia, CardActionArea, Box, Button, Typography, useTheme, Card } from "@mui/material";
import { tokens, themeSettings } from "../../theme";
import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";

import Grid from '@mui/material/Grid';

import { AuthContext } from '../../context/AuthContext';
import { HeadContext } from "../../context/HeadContext";
import config from "../../config";

const Home = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const auth = useContext(AuthContext);
  const head = useContext(HeadContext);
  const navigate = useNavigate();

  const inputRef = useRef(null);

  useEffect(() => {
    console.log(inputRef)
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
  }, [inputRef])

    // Reusable Card Component
    const CustomCard = ({ title, image, description, onClick }) => {
        return (
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea onClick={onClick}>
              <CardMedia
                component="img"
                height="140"
                image={image}
                alt={title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {description}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary" variant="outlined" onClick={onClick}>
                Play
              </Button>
            </CardActions>
          </Card>
        );
      };

    const cardsData = [
        {
            title: "Reaction Test",
            image: "/public/reaction-background.jpg",
            description: "The reaction test is about testing your reaction speed, when the screen becomes green, click it as fast as possible, and your score is noted",
            onClick: () => {navigate("/games/reaction")},
          },
        {
          title: "Aim Test",
          image: "/public/aim-background.jpg",
          description: "The goal of the aimgame is to test your hand-eye coordination skills, click the 5 shown targets as fast as possible, your final score is the average time it takes you to clear a screen.",
          onClick: () => {navigate("/games/aim")},
        },
        {
            title: "Typing Test",
            image: "/public/typing-background.jpg", 
            description: "Test your typing speed and accuracy with our typing test. Improve your typing skills and become more efficient!",
            onClick: () => {navigate("/games/typing")},
          },
          {
            title: "Simon Says",
            image: "/public/simon-background.jpg", 
            description: "The goal of this game is to repeat as many patterns that appear on the screen as possible.",
            onClick: () => {navigate("/games/simon")},
          },
          {
            title: "Numbers Test",
            image: "/public/number-background.jpg", 
            description: "The goal of this test is to memorize as long a sequence of numbers of possible. You are first given one number which will increase for each round.",
            onClick: () => {navigate("/games/numbers")},
          },
          {
            title: "Maze Solver",
            image: "/public/maze-background.jpg",
            description: "This test is to measure your problem solving and pattern recognition skills, when the game starts hover your mouse over the green square and get to the red square without touching a wall. Time starts when you are shown the maze",
            onClick: () => {navigate("/games/maze")},
          }
      ];


    // The game is running
    return (
    <Box>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <Grid item xs={12} sm={12} md={8} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography variant="h1" gutterBottom textAlign={"center"} sx={{ fontFamily: 'Verdana, sans-serif'}}>Welcome to Aperture Testing Platform!</Typography>
            
            <Box sx={{
                backgroundColor: '#221C69',
                padding: '16px',
                borderRadius: '8px',
                mb: '48px',
                width: '100%',
                textAlign: 'center',
              }}>
              <Typography variant="body1" gutterBottom sx={{ color: 'white', textAlign: 'center' }}>
                This is Aperture Testing Platform where you can test yourself in different benchmarks. <br/>
                This includes your reaction, memory, typing speed and motor skills.
              </Typography>
            </Box>     
            <Box component="form">
                <Grid container spacing={2} justifyContent="center">
                {/* renders the card dynamically*/}
                {cardsData.map((card, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <CustomCard {...card} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh',
          }}
        />
      </Grid>
    </Box>
  );
}

export default Home;

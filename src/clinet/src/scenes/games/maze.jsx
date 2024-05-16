import { Box, Button, IconButton, Typography, useTheme, Table, TextField, Card, Avatar, ButtonBase, LinearProgress } from "@mui/material";
import { tokens, themeSettings } from "../../theme";
import { useState, useEffect, useContext, useRef } from "react";
import { DataGrid, GridFooter } from '@mui/x-data-grid';
import Splash from "../../components/splashScreen"

import { AuthContext } from '../../context/AuthContext';
import { HeadContext } from "../../context/HeadContext";

import { save_game } from "../../utils/games";

import config from "../../config";

function generateMaze(rows, cols) {
  // Create a 2D grid representing the maze
  let maze = [];
  for (let i = 0; i < rows; i++) {
    maze[i] = [];
    for (let j = 0; j < cols; j++) {
      maze[i][j] = {
        visited: false,
        walls: {
          top: true,
          right: true,
          bottom: true,
          left: true
        }
      };
    }
  }

  // Initialize stack and choose random starting cell
  let stack = [];
  let startRow = Math.floor(Math.random() * rows);
  let startCol = Math.floor(Math.random() * cols);
  maze[startRow][startCol].visited = true;
  stack.push({ row: startRow, col: startCol });

  // Depth-first search algorithm
  while (stack.length > 0) {
    let current = stack.pop();
    let { row, col } = current;
    let neighbors = [];

    // Get unvisited neighboring cells
    if (row > 0 && !maze[row - 1][col].visited) neighbors.push({ row: row - 1, col });
    if (col < cols - 1 && !maze[row][col + 1].visited) neighbors.push({ row, col: col + 1 });
    if (row < rows - 1 && !maze[row + 1][col].visited) neighbors.push({ row: row + 1, col });
    if (col > 0 && !maze[row][col - 1].visited) neighbors.push({ row, col: col - 1 });

    if (neighbors.length > 0) {
      // Push current cell back to stack
      stack.push(current);

      // Choose random unvisited neighbor
      let chosenNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];

      // Remove wall between current cell and chosen cell
      if (chosenNeighbor.row === row - 1) {
        maze[row][col].walls.top = false;
        maze[chosenNeighbor.row][chosenNeighbor.col].walls.bottom = false;
      } else if (chosenNeighbor.col === col + 1) {
        maze[row][col].walls.right = false;
        maze[chosenNeighbor.row][chosenNeighbor.col].walls.left = false;
      } else if (chosenNeighbor.row === row + 1) {
        maze[row][col].walls.bottom = false;
        maze[chosenNeighbor.row][chosenNeighbor.col].walls.top = false;
      } else if (chosenNeighbor.col === col - 1) {
        maze[row][col].walls.left = false;
        maze[chosenNeighbor.row][chosenNeighbor.col].walls.right = false;
      }

      // Mark chosen cell as visited and push to stack
      maze[chosenNeighbor.row][chosenNeighbor.col].visited = true;
      stack.push(chosenNeighbor);
    }
  }

  return maze;
}

const MazeGame = () => {
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

  const [maze, setMaze] = useState(generateMaze(7,11));
  const [prevTarget, setPrevTarget] = useState(null);
  const [doDetection, setDoDetection] = useState(false);
  const [startTime, setStartTime] = useState(-1);

  // Save the users score
  useEffect(() => {
    if (isFailed) {
      setIsStarted(false);
      // save_game(7, score);
    }
  }, [isFailed])

  // Collisoin detection
  const handleMouseEnter = (event, rowIndex, colIndex) => {
    if (rowIndex === 0 && colIndex === 0 && !doDetection) {
      setDoDetection(true);
      return;
    }

    if (!doDetection) {
      setPrevTarget(null);
      return;
    }

    console.log(rowIndex, colIndex, prevTarget)
    const cell = maze[rowIndex][colIndex];
    let triggered = false;
    if (prevTarget !== null) {
      const prevCell = maze[prevTarget[0]][prevTarget[1]];
      const directionY = rowIndex - prevTarget[0];
      const directionX = colIndex - prevTarget[1];

      console.log(cell.walls)
      console.log(prevCell.walls)
      console.log(directionX)

      if (directionX < 0 && cell.walls.right) {
        setIsFailed(true);
        triggered = true;
      } else if (directionX > 0 && prevCell.walls.right) {
        setIsFailed(true);
        triggered = true;
      }

      if (directionY < 0 && cell.walls.bottom) {
        setIsFailed(true);
        triggered = true;
      } else if (directionY > 0 && prevCell.walls.bottom) {
        setIsFailed(true);
        triggered = true;
      }
    }
    setPrevTarget([rowIndex, colIndex]);

    if (!triggered && rowIndex === maze.length-1 && colIndex === maze[0].length-1) {
      save_game(7, +new Date() - startTime);
      setScore(+new Date() - startTime);
      setIsFailed(true);
    }
  };

  if (isShownSplash) {
    return <Splash
      benchmarkid={7}
      name="Maze Solver"
      description="This test is to measure your problem solving and pattern recognition skills, when the game starts hover your mouse over the green square and get to the red square without touching a wall. Time starts when you are shown the maze"
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
            onClick={() => {setScore(1); setIsStarted(true); setIsFailed(false); setDoDetection(false); setMaze(generateMaze(7,11)); setStartTime(+new Date());}}
          >
      
            <Typography variant="h1">{score !== 1 ? `${score} ms` : 'You crossed a border, try again'}</Typography>
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
            onClick={() => { setIsStarted(true); setScore(1); setStartTime(+new Date()); }}
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
              <Box 
                width='100%' 
                height='100%' 
                display="grid" 
                gridTemplateColumns={`repeat(${maze[0].length}, 80px)`}
                borderTop="3px solid #101010"
                borderLeft="3px solid #101010"
                onMouseLeave={() => {if (doDetection) {setIsFailed(true)}}}
              >
                {maze.map((row, rowIndex) => (
                  row.map((cell, colIndex) => (
                    <Box
                      key={`${rowIndex}-${colIndex}`}
                      width="80px"
                      height="80px"
                      border={0}
                      borderBottom={cell.walls.bottom ? "3px solid #101010" : "none"}
                      borderRight={cell.walls.right ? "3px solid #101010" : "none"}
                      onMouseEnter={(event) => handleMouseEnter(event, rowIndex, colIndex)}
                      backgroundColor={rowIndex === 0 && colIndex === 0 ? "#0f0" : rowIndex === maze.length-1 && colIndex === maze[0].length-1 ? "#f00" : "unset"}
                      style={{ cursor: doDetection ? "crosshair" : "unset" }}
                    />
                  ))
                ))}
              </Box>
            </Box>
          </>        
        :
          <>
          </>
        }
      </Box>
    </>
  )
}

export default MazeGame;

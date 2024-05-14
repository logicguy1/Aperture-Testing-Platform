
import { Box, Button, IconButton, Typography, useTheme, Table, TextField, Card, Avatar, ButtonBase, Input, List, ListItem, ListItemText, CardActions, CardContent, Divider, ListItemAvatar } from "@mui/material";
import { tokens, themeSettings } from "../../theme";
import { useState, useEffect, useContext } from "react";
import { DataGrid, GridFooter } from '@mui/x-data-grid';
import * as React from "react";
import PersonIcon from '@mui/icons-material/Person';

import { AuthContext } from '../../context/AuthContext';
import { HeadContext } from "../../context/HeadContext";

import { capitalizeFirstLetter } from "../../utils/strings";

import config from "../../config";


const Index = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const auth = useContext(AuthContext);
  const head = useContext(HeadContext);

  const [data, setData] = useState(null);

  const [friend_map, setFriendMap] = useState(null)
  const [friend_code, setFriendCode] = useState(null);

  const executeFriendCode = () => {
    fetch(`${config.baseurl}/friends/add_friend`,
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          friend_code: friend_code
        })
      })
  }

  useEffect(() => {
    head.setData({ location: ["Dashboard"] });

    fetch(
      `${config.baseurl}/friends/get_code`,
      {
        credentials: 'include',
      }
    ).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse the response JSON
    })
      .then(data => {
        // Handle the response data here
        console.log(data);
        if (data.status) {
          setData(data.data)
        }
      })

    fetch(`${config.baseurl}/friends/get_friends`,
      {
        method: "GET",
        credentials: 'include'
      }).then(response => {
        if (!response.ok) {
          throw new Error('Network response was not okay');
        }
        return response.json()
      }).then(data => {
        setFriendMap(data.data.friends);
      })
  }, [])

  const card = (
    <Box p={3}>
      <CardContent>
        <Typography sx={{ fontSize: 16 }} color="text.primary" gutterBottom>
          Your friend code:
        </Typography>
        <Box sx={{ border: 1, borderColor: "grey.500", borderRadius: 12, p: 2 }}>
          <Typography variant="h4" component="div">{data?.friend_code}</Typography>
        </Box>
        <Typography sx={{ fontSize: 12, marginTop: "16px" }} color="text.secondary">
          Submit a friend's code below:
        </Typography>
      </CardContent>
      <CardActions style={{ justifyContent: "center" }}>
        <form onSubmit={(e) => { e.preventDefault(); executeFriendCode() }} >
          <TextField
            label="Friend code"
            variant="standard"
            onChange={event => setFriendCode(event.target.value)}
            sx={{ width: "60%" }}
          /> 
          <Button
            style={{ marginLeft: "20px", marginTop: "5px", backgroundColor: "#431C76" }}
            variant="contained"
            type="submit"
          > Submit </Button>
      </form>
      </CardActions>
      <Divider style={{ margin: "16px 0" }} />
      <Typography variant="h6">Friend List</Typography> 
      <List>
        {friend_map && friend_map.map((friend, index) => (
          <ListItem key={index}>
            <ListItemAvatar>
              <Avatar>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={friend} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Card variant="outlined">{card}</Card>
      
      </Box>
    </>
  )
}

export default Index;


import { Box, Button, IconButton, Typography, useTheme, Table, TextField, Card, Avatar, ButtonBase, Input } from "@mui/material";
import { tokens, themeSettings } from "../../theme";
import { useState, useEffect, useContext } from "react";
import { DataGrid, GridFooter } from '@mui/x-data-grid';

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
        setFriendMap(data.data.friends.map(friend =>
          <li>{friend}</li>))
      })
  }, [])

  return (
    <>
      {auth.token.user} - {data?.friend_code}
      <form onSubmit={(e) => { e.preventDefault(); executeFriendCode() }} >
        <TextField
          label="FriendCode"
          variant="standard"
          onChange={event => setFriendCode(event.target.value)}
        />
        <Button
          style={{ marginLeft: "20px", marginTop: "5px" }}
          variant="contained"
          type="submit"
        > Submit </Button>
      </form>
      <ul>
        {friend_map}
      </ul>
    </>
  )
}

export default Index;

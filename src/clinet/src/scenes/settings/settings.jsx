import { Box, Container, Button, Grid, Typography, useTheme, TextField, Card, Avatar, ButtonBase } from "@mui/material";
import { tokens, themeSettings } from "../../theme";
import { useState, useEffect, useContext } from "react";
import { DataGrid, GridFooter } from '@mui/x-data-grid';

import { AuthContext } from '../../context/AuthContext';
import { HeadContext } from "../../context/HeadContext";
import { useNavigate, Link, useParams } from "react-router-dom";

import { capitalizeFirstLetter } from "../../utils/strings";

import config from "../../config";


const Index = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const head = useContext(HeadContext);
  const { userId } = useParams();

  const [user, setUser] = useState();
  const [pass, setPass] = useState();
  const [email, setEmail] = useState();

  console.log(userId)

  const [data, setData] = useState(null);

  const handleUsernameChange = (event) => {
    setUser(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPass(event.target.value);
  };

  useEffect(() => {
    let user = -1;
    if (userId !== undefined) {
      user = userId;
    }

    fetch(
      `${config.baseurl}/dashboard/get_data/${user}`,
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
  }, [userId])

  return (
  <>
  <Box
  height="15em"
  position="relative"
  borderBottom={`1px ${colors.borderColor} solid`}
  sx={{
    background: "linear-gradient(142deg, rgba(191,10,185,1) 0%, rgba(113,67,200,1) 40%, rgba(14,157,204,1) 100%)"
  }} >
    <Box 
      position="absolute"
      left="15%"
      top="8em"
      display="flex"
      gap="2em"
      color={colors.grey[900]}>
        <Avatar
          alt={capitalizeFirstLetter(auth.token.user)}
          src="/static/images/avatar/1.jpg"
          sx={{ width: 120, height: 120 }}
        />
        <Box mt="2.5em" display="flex" flexDirection="column" gap=".3em">
          <Typography variant="h3">
            {capitalizeFirstLetter(data?.name === undefined ? "" : data.name)}
          </Typography>
          <Typography variant="h5">
            Joined {data?.created}
          </Typography>
      </Box>
    </Box>
</Box>
<Box
  height="3.5em"
  borderBottom={`1px ${colors.borderColor} solid`}
  display="flex"
  flexDirection="row-reverse"
>
  <Button sx={{
      backgroundColor: colors.blueAccent[500],
      color: colors.grey[900],
      padding: "0 2em",
      borderRadius: "20px",
      margin: "5px"
    }}
    onClick={() => {navigate("/")}}>
    Save
  </Button>
  <Button variant="outlined"
    sx={{
      padding: "0 2em",
      borderRadius: "20px",
      margin: "5px"
    }}
    onClick={() => {navigate("/")}}
  >
    Cancel
  </Button>
</Box>
<Box
  display="flex"
  width="100%"
  height="60%"
  gap="2em"
  p="1em"
>
<Container maxWidth="sm">
  <Box mt={3}>
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={12}>
        <Box width="100%">
          <Box mb={2}>
            <Typography variant="h5" pb="1em">
              My Details
            </Typography>
            <form>
              <Box mb={2}>
                <TextField 
                fullWidth 
                label="Username" 
                variant="outlined" />
              </Box>
              <Box mb={2}>
                <TextField 
                fullWidth 
                label="Email" 
                variant="outlined" />
              </Box>
              <Box mb={1}>
                <Typography gutterBottom color="text.secondary">Change Password</Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField 
                  type="password" 
                  label="Old Password" 
                  variant="outlined" 
                  value={""}
                  fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField 
                  type="password" 
                  label="New Password" 
                  variant="outlined" 
                  fullWidth />
                </Grid>
              </Grid>
            </form>
          </Box>
        </Box>
      </Grid>
    </Grid>
  </Box>
</Container>
</Box>
</>
  )
}

export default Index;

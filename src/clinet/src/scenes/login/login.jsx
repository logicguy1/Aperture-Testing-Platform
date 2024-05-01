import { Box, Button, IconButton, Typography, useTheme, Table, TextField, Card } from "@mui/material";
import { tokens, themeSettings } from "../../theme";
import { useState, useEffect, useContext } from "react";

import { AuthContext } from '../../context/AuthContext';

import background from "../../assets/img/wp2.png";
import { useNavigate } from "react-router-dom";

import config from "../../config";

const Login = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const [user, setUser] = useState();
  const [pass, setPass] = useState();
  const [email, setEmail] = useState();
  const [isSignin, setSignin] = useState(true);

  const handleLogin = () => {
    console.log(user, pass);
    fetch(
      `${config.baseurl}/auth/login`,
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          user: user,
          pass: pass,
        })
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
          auth.setToken(data)
          navigate("/");
        } else {
          alert("Invalid login.")
        }
      })
      .catch(error => {
        // Handle any errors that occurred during the fetch
        alert('Fetch error:', error);
      });
  }
  const handleRegister = () => {
    console.log(user, pass);
    fetch(
      `${config.baseurl}/auth/register`,
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          user: user,
          email: email,
          pass: pass,
        })
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
        alert(data.message)
        if (data.status) {
          setSignin(true)
        } else {
        }
      })
      .catch(error => {
        // Handle any errors that occurred during the fetch
        alert('Fetch error:', error);
      });
  }

  return (
    <>
      <Box
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundImage: `url(${background})`
        }}
      />
      <Card variant="outlined"
        style={{
          transform: "translate(-50%, -50%)",
          boxSizing: "border-box",
          position: "absolute",
          left: "50%",
          top: "50%",
          padding: "40px",
          height: "500px",
          width: "400px",
        }}
      >

        <Box
          position="relative"
          height="100%"
        >
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Typography
              variant="h6"
              fontWeight="500"
              color={colors.grey[100]}
              textAlign="left"
            >
              Aperture Testing Platform
            </Typography>
          </Box>

          <Box
            position="absolute"
            left="50%"
            top="50%"
            style={{
              transform: "translate(-50%, -50%)",
            }}
          >
            {isSignin ? (
              <form onSubmit={(e) => { e.preventDefault(); handleLogin() }}>
                <Box
                  width="100%"
                >
                  <TextField
                    id="standard-basic"
                    label="Brugernavn"
                    variant="standard"
                    onChange={event => setUser(event.target.value)}
                    style={{
                      width: "300px",
                      marginTop: "15px"
                    }}
                  />
                  <br />
                  <TextField
                    id="standard-basic"
                    label="Adgangskode"
                    variant="standard"
                    type="password"
                    onChange={event => setPass(event.target.value)}
                    style={{
                      width: "300px",
                      marginTop: "15px",
                      marginBottom: "23px"
                    }}
                  />
                  <br />
                  <Button
                    style={{ width: "300px", height: "45px", backgroundColor: "black" }}
                    variant="contained"
                    type="submit"
                  >
                    Log Ind
                  </Button>
                </Box>
              </form>
            ) : ( // Handle register
              <form onSubmit={(e) => { e.preventDefault(); handleRegister() }}>
                <Box
                  width="100%"
                >
                  <TextField
                    id="standard-basic"
                    label="Brugernavn"
                    variant="standard"
                    onChange={event => setUser(event.target.value)}
                    style={{
                      width: "300px",
                      marginTop: "15px"
                    }}
                  />
                  <br />
                  <TextField
                    id="standard-basic"
                    label="Electronic mail adress"
                    variant="standard"
                    onChange={event => setEmail(event.target.value)}
                    style={{
                      width: "300px",
                      marginTop: "15px"
                    }}
                  />
                  <br />
                  <TextField
                    id="standard-basic"
                    label="Adgangskode"
                    variant="standard"
                    type="password"
                    onChange={event => setPass(event.target.value)}
                    style={{
                      width: "300px",
                      marginTop: "15px",
                      marginBottom: "23px"
                    }}
                  />
                  <br />
                  <Button
                    style={{ width: "300px", height: "45px", backgroundColor: "black" }}
                    variant="contained"
                    type="submit"
                  >
                    Register
                  </Button>
                </Box>
              </form>
            )}
          </Box>
        </Box>

        <Typography
          variant="h6"
          fontWeight="500"
          color={colors.grey[100]}
          textAlign="left"
        >
          Click here to change to {isSignin ? (<Button onClick={() => setSignin(false)} >Register</Button>) : (<Button onClick={() => setSignin(true)} >Sign in</Button>)}
        </Typography>
      </Card>
    </>
  )
}

export default Login;

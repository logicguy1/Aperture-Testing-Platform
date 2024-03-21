import React, { useState }  from 'react';
import { Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import './App.css';

import { AuthProvider } from './context/AuthContext';
import { HeadProvider } from './context/HeadContext';
import { SnackBarProvider, NotifSnackBar } from './context/SnackBarContext';

import Login from "./scenes/login/login";

import Index from './scenes/index';

import Sidebar from "./scenes/global/sidebar.jsx";
import Topbar from "./scenes/global/topbar.jsx";

const App = () => { 
  const [theme, colorMode] = useMode();
  const [token, setToken] = useState(null);
  const [headerData, setHeaderData] = useState({location: ["FrNet", "Dashboard"]});
  const [expanded, setExpanded] = useState(false);
  const [snackText, setSnackText] = useState(false);

  console.log("token", token)

  return (
    <AuthProvider value={{token: token, setToken: setToken}}>
      <HeadProvider value={{data: headerData, setData: setHeaderData, expanded: expanded}}>
        <SnackBarProvider value={{text: snackText, setText: setSnackText}}>
          <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <NotifSnackBar />
              {token === null ? (
                <Login />
              ) : (
                <Box className="App" display="flex" height="100%">
                  <Sidebar setExpanded={setExpanded} />
                  <Box>
                    <Topbar />
                    <Box 
                      className="content" 
                      style={{ 
                        padding: "25px",
                        width: `calc(100vw - ${expanded ? '85px' : '275px'})`, 
                        minHeight: "calc(100vh - 54px)" 
                      }}
                      display="flex"
                      flexDirection="column"
                    >
                      <Routes>
                        <Route path="/" element={<Index />} />
                      </Routes>
                    </Box>
                  </Box>
                </Box>
              )}
            </ThemeProvider>
          </ColorModeContext.Provider>
        </SnackBarProvider>
      </HeadProvider>
    </AuthProvider>
  )
}

export default App;

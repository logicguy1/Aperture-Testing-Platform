import React, { createContext, useContext, useState, useEffect } from "react";
import Snackbar from '@mui/material/Snackbar';

export const SnackBarContext = createContext();

export const SnackBarProvider = ({ children, value }) => {
  return (
    <SnackBarContext.Provider value={value}>
      {children}
    </SnackBarContext.Provider>
  );
}

export const NotifSnackBar = () => {
  const snackData = useContext(SnackBarContext);

  const [ open, setOpen ] = useState(false);

  useEffect(() => {
    if (snackData.text !== "") {
      setOpen(true);
    }
  }, [snackData.text])

  if (snackData.text == "") {
    return <></>;
  }

  return ( 
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={() => {setOpen(false); snackData.setText("");}}
      message={snackData.text}
    />
  )
}

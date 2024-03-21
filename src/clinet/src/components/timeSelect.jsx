import React, { useState, useEffect, useContext, useCallback } from "react";
import { Typography, useTheme, Chip , Box, Select, MenuItem } from "@mui/material";
import { tokens } from "../theme.js";
import { AuthContext } from "../context/AuthContext.js";

import config from "../config";
import { make_zero, split_time } from "../utils/timeFunc";

function range(start, end, step = 1) {
  const result = [];
  for (let i = start; i < end; i += step) {
    result.push(i);
  }
  return result;
}

const TimeSelect = ({ time, setTime, label, update }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const auth = useContext(AuthContext);

  const [ hour, setHour ] = useState(0);
  const [ minute, setMinute ] = useState(0);
  const [ day, setDay ] = useState(1);
  const [ updated, setUpdated ] = useState(true);

  useEffect(() => {
    if (!updated) {
      setTime(`${hour}:${minute} ${day}`)
      setUpdated(true);
    } else {
    }
  }, [day, hour, minute])

  useEffect(() => {
    if (time !== undefined) {
      setUpdated(true);
      const timeout = split_time(time);
      setHour(parseInt(timeout[0]));
      setMinute(parseInt(timeout[1]));
      setDay(parseInt(timeout[2]));
    }
  }, [update])

  return (
    <Box 
      display="flex"
      alignItems="center"
      gap="4px"
      mb={1}
    >
      <Typography 
        fontWeight={500}
        width="40px"
      >{label}</Typography>
      <Select
        sx={{
          width: "65px",
          height: "30px"
        }}
        value={parseInt(hour)}
        onChange={(e) => {setUpdated(false); setHour(e.target.value); }}
      >
        <MenuItem value="0" key="0">00</MenuItem>
        <MenuItem value="1" key="1">01</MenuItem>
        <MenuItem value="2" key="2">02</MenuItem>
        <MenuItem value="3" key="3">03</MenuItem>
        <MenuItem value="4" key="4">04</MenuItem>
        <MenuItem value="5" key="5">05</MenuItem>
        <MenuItem value="6" key="6">06</MenuItem>
        <MenuItem value="7" key="7">07</MenuItem>
        <MenuItem value="8" key="8">08</MenuItem>
        <MenuItem value="9" key="9">09</MenuItem>
        <MenuItem value="10" key="10">10</MenuItem>
        <MenuItem value="11" key="11">11</MenuItem>
        <MenuItem value="12" key="12">12</MenuItem>
        <MenuItem value="13" key="13">13</MenuItem>
        <MenuItem value="14" key="14">14</MenuItem>
        <MenuItem value="15" key="15">15</MenuItem>
        <MenuItem value="16" key="16">16</MenuItem>
        <MenuItem value="17" key="17">17</MenuItem>
        <MenuItem value="18" key="18">18</MenuItem>
        <MenuItem value="19" key="19">19</MenuItem>
        <MenuItem value="20" key="20">20</MenuItem>
        <MenuItem value="21" key="21">21</MenuItem>
        <MenuItem value="22" key="22">22</MenuItem>
        <MenuItem value="23" key="23">23</MenuItem>
      </Select>
      <Typography 
        fontWeight={500}
      > : </Typography>
      <Select
        sx={{
          width: "65px",
          height: "30px"
        }}
        value={parseInt(minute)}
        onChange={(e) => {setUpdated(false); setMinute(e.target.value); }}
      >
        <MenuItem value="0" key="0">00</MenuItem>
        <MenuItem value="15" key="1">15</MenuItem>
        <MenuItem value="30" key="2">30</MenuItem>
        <MenuItem value="45" key="3">45</MenuItem>
      </Select>
      <Typography 
        fontWeight={500}
      > Dag </Typography>
      <Select
        sx={{
          width: "65px",
          height: "30px"
        }}
        value={parseInt(day)}
        onChange={(e) => {setUpdated(false); setDay(e.target.value); }}
      >
      {range(0,auth.token.settings.festival_settings.festival_length).map((d) => (
        <MenuItem value={`${d+1}`} key={`${d+1}`}>{`${make_zero(d+1)}`}</MenuItem>
      ))}
      </Select>
    </Box>
  )
};

export default TimeSelect;

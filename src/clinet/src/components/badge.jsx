import { Typography, useTheme, Chip } from "@mui/material";
import { tokens } from "../theme.js";

import CircleIcon from '@mui/icons-material/Circle';

const Badge = ({ text, type }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // TYPE ONE OF: [red, yellow, green, black] 
  console.log(text, type);

  
  switch(type) {
    case "green":
      return (
        <Chip 
          label={text} 
          variant="outlined" 
          size="small" 
          icon={<CircleIcon color={colors.greenAccent[400]} />}
          style={{ color: colors.greenAccent[400], borderColor: colors.greenAccent[400] }} 
        />
      );
    case "yellow":
      return (
        <Chip 
          label={text} 
          variant="outlined" 
          size="small" 
          icon={<CircleIcon color={colors.yellowAccent[400]} />}
          style={{ color: colors.yellowAccent[400] }} 
        />
      );
    case "black":
      return (
        <Chip 
          label={text} 
          variant="outlined" 
          size="small" 
          icon={<CircleIcon color={colors.grey[800]} />}
          style={{ color: colors.grey[200] }} 
        />
      );
    case "red":
      return (
        <Chip 
          label={text} 
          variant="outlined" 
          size="small" 
          icon={<CircleIcon color={colors.redAccent[400]} />}
          style={{ color: colors.redAccent[400], borderColor: colors.redAccent[400] }} 
        />
      );
    case "purple":
      return (
        <Chip 
          label={text} 
          variant="outlined" 
          size="small" 
          icon={<CircleIcon color="#c42bff" />}
          style={{ color: "#c42bff", borderColor: "#c42bff" }} 
        />
      );
    default:
      return <></>
  }
};

export default Badge;

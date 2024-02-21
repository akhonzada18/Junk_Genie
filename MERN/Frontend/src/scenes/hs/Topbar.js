import React, { useContext } from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { ColorModeContext} from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
const Topbar = () => {
  var navigator = useNavigate()
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const { pathname } = useLocation();
  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* TITLE */}
      <Typography variant="h2" fontWeight="bold" fontFamily="'Allura', cursive">
        JUNKGENIE
      </Typography>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        {!(pathname === "/login" || pathname === "/signup") ? (
          <Link to="/profile">
            <IconButton>
              <PersonOutlinedIcon />
            </IconButton>
          </Link>
        ) : null}{
          localStorage.getItem('user')?<IconButton onClick={()=>{
        localStorage.clear()
        navigator('/login')
      }}>
        <ArrowForwardIcon />
      </IconButton>
    :<></>  
    }
      </Box>
      
    </Box>
  );
};

export default Topbar;

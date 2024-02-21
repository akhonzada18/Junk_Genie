import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import AssignmentIcon from "@mui/icons-material/Assignment";
import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined";
import PersonIcon from "@mui/icons-material/Person";
import PieChart from "../../components/PieChart";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import WorkerMap from "../../components/WorkerMap";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  var navigate = useNavigate();
  // State to store the fetched data
  const [statBoxData, setStatBoxData] = useState({
    verifiedComplaints: 0,
    totalComplaints: 0,
    totalWorkers: 0,
    totalUsers: 0,
  });
  var [varCs,setVarCs] = useState(0);
  // Fetch data from the server on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const verifiedComplaintsResponse = await axios.get("http://localhost:3000/admin/complaints/getVerifiedComplaints");
        const totalComplaintsResponse = await axios.get("http://localhost:3000/admin/complaints/getAllComplaints");
        const totalWorkersResponse = await axios.get("http://localhost:3000/admin/workers/getAllWorkers");
        const totalUsersResponse = await axios.get("http://localhost:3000/admin/users/getAllUsers");
        const response = await axios.get(
          "http://localhost:3000/admin/complaints/getAllComplaints"
        );
        var x1 = 0;
        response.data.forEach(x=>{
          x1+=x.status?1:0
        })
        setVarCs(x1)
        const responseworkers = await axios.get(
          "http://localhost:3000/admin/workers/getAllWorkers"
        );
        const responseusers = await axios.get(
          "http://localhost:3000/admin/users/getAllUsers"
        );
        setStatBoxData({
          verifiedComplaints: verifiedComplaintsResponse.data.totalCount || 0,
          totalComplaints: response.data.length,
          totalWorkers: responseworkers.data.length || 0,
          totalUsers: responseusers.data.length || 0,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  if(!localStorage.getItem('user')) navigate('/login')
  return (
    <Grid m="0 20px">
      {/* HEADER */}
      <Grid
        display="flex"
        fontFamily="'Carter One', cursive"
        justifyContent="space-between"
        alignItems="center"
      >
        <Header title="Dashboard" subtitle="Welcome to admin dashboard" />
      </Grid>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 2fr)"
        gridAutoRows="140px"
        gap="5px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={varCs}
            subtitle="Verified Complaints"
            // progress="0.75"
            // increase="+14%"
            icon={
              <AssignmentTurnedInIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={statBoxData.totalComplaints}
            subtitle="Total Complaints"
            // progress="0.50"
            // increase="+21%"
            icon={
              <AssignmentIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={statBoxData.totalWorkers}
            subtitle="Total Workers"
            // progress="0.30"
            // increase="+5%"
            icon={
              <EngineeringOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={statBoxData.totalUsers}
            subtitle="Total Users"
            // progress="0.80"
            // increase="+43%"
            icon={
              <PersonIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="0px 10px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "20px 30px 0 30px" }}
          >
            Complaints
          </Typography>
          <Box height="280px">
            <PieChart isDashboard={true} />
          </Box>
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "20px 30px 0 30px" }}
          >
            Workers
          </Typography>
          <Box height="280px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "20px 30px 0 30px" }}
          >
            Workers Tracking
          </Typography>
          <Box height="280px" style={{display:'flex',justifyContent:'center'}}>
            <WorkerMap isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default Dashboard; 

import React, { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import axios from "axios";

const Feedback = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [feedbackData, setFeedbackData] = useState([]);

  const columns = [
    {
      field: "feedbackCategory",
      headerName: " Feedback Category",
      width: 300,
      minwidth: 100,
      resizable: true,
      sortable: true,
      filter: true,
    },
    {
      field: "feedback",
      headerName: "Feedback",
      width: 450,
      minwidth: 300,
      resizable: true,
      sortable: true,
      filter: true,
    },
    {
      field: "rating",
      headerName: "Rating",
      width: 100,
      minwidth: 100,
      resizable: true,
      sortable: true,
      filter: true,
    },
  ];

  useEffect(() => {
    // Function to fetch feedback data
    const fetchFeedbackData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/admin/feedbacks/getAllFeedbacks"
        ); // Replace with your actual API endpoint
        setFeedbackData(response.data);
      } catch (error) {
        console.error("Error fetching feedback data:", error);
      }
    };

    // Call the fetch function
    fetchFeedbackData();
  }, []);

  return (
    <Box m="0 20px">
      <Header title="Feedback" subtitle="User's Feedback Page" />

      <Box
        m="40px 0 0 0"
        height="70vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={feedbackData}
          columns={columns}
          getRowId={(row) => row._id}
        />
      </Box>
    </Box>
  );
};

export default Feedback;

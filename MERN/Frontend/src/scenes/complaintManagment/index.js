import { Box, Typography, Button, Stack, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";

const StatusCellRenderer = ({ row }) => (
  <Typography
    sx={{
      fontSize: 12,
    }}
  >
    {row?.status ? "Verified" : "Unverified"}
  </Typography>
);

const ActionsCellRenderer = ({ row, updateData }) => {
  const handleVerify = async () => {
    try {
      await axios.put(
        `http://localhost:3000/admin/complaints/toggleStatus/${row._id}`
      );
      updateData(); // Update the DataGrid after the operation
    } catch (error) {
      console.error("Error verifying complaint:", error);
    }
  };

  const handleRemove = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/admin/complaints/deleteComplaint/${row._id}`
      );
      updateData(); // Update the DataGrid after the operation
    } catch (error) {
      console.error("Error removing complaint:", error);
    }
  };

  return (
    <Box width={"100%"}>
      <Stack direction={"row"} gap={2}>
      

      <Button
          variant="contained"
          sx={{
            padding: 1,
            backgroundColor: row?.status ? "#ff5252" : "#4CAF50", // Customize the color based on the verification status
          }}
          
          onClick={handleVerify}
        >
          <Typography sx={{ fontSize: 12, color: "white" }}>
            {row?.status ? "Unverify" : "Verify"}
          </Typography>
        </Button>
        <Button
          variant="contained"
          sx={{
            padding: 1,
            backgroundColor: "#B71C1C",
          }}
          onClick={handleRemove}
        >
          <Typography sx={{ fontSize: 12, color: "white" }}>Remove</Typography>
        </Button>
      </Stack>
    </Box>
  );
};

const ComplaintManagement = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    {
      headerName: "Image",
      minWidth: 200,
      field: "image",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Place Details",
      minWidth: 350,
      field: "placeDetails",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Date",
      minWidth: 200,
      field: "date",
      sortable: true,
      filter: true,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.toLocaleString(); // Adjust the format as needed
      },
    },
    {
      headerName: "Status",
      minWidth: 150,
      field: "status",
      sortable: true,
      renderCell: StatusCellRenderer,
    },
    {
      headerName: "Actions",
      minWidth: 200,
      field: "actions",
      renderCell: (params) => (
        <ActionsCellRenderer {...params} updateData={fetchData} />
      ),
    },
  ];

  const [complaintData, setComplaintData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/admin/complaints/getAllComplaints"
      );
      setComplaintData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box m="0 20px">
      <Header title="Complaints" subtitle="Managing Complaints" />
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
          "& .name-column--cell": {
            color: colors.greenAccent[300],
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
          rows={complaintData}
          columns={columns}
          getRowId={(row) => row._id}
        />
      </Box>
    </Box>
  );
};

export default ComplaintManagement;

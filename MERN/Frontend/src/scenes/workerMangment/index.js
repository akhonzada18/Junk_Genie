import {
  Box,
  Typography,
  Button,
  Stack,
  useTheme,
  colors,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";

const StatusCellRenderer = ({ row }) => {
  return (
    <Stack direction={"row"} alignItems={"center"}>
      <Typography color={row?.verified ? "green" : "red"}>
        {row?.verified ? "Verified" : "Unverified"}
      </Typography>
    </Stack>
  );
};

const Actions = ({ row, updateData }) => {
  const fetchData = async (id) => {
    try {
      await axios.put(`http://localhost:3000/admin/workers/toggleStatus/${id}`);
      updateData(); // Update the DataGrid after the operation
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const removeWorker = async (id) => {
    try {
      await axios.delete(
        `http://localhost:3000/admin/workers/deleteWorker/${id}`
      );
      updateData(); // Update the DataGrid after the operation
    } catch (error) {
      console.error("Error removing worker:", error);
    }
  };

  return (
    <Box width={"100%"}>
      <Stack direction={"row"} gap={2}>
        <Button
          variant="contained"
          sx={{
            padding: 1,
            backgroundColor: row?.verified ? "#ff5252" : "#4CAF50", // Customize the color based on the verification status
          }}
          onClick={() => fetchData(row?._id)}
        >
          <Typography sx={{ fontSize: 12, color: colors.grey[100] }}>
            {row?.verified ? " Restrict" : "Verify"}
          </Typography >
        </Button>
        <Button variant="contained"
          sx={{
            padding: 1,
            backgroundColor:  "#B71C1C", // Customize the color based on the verification status
          }} onClick={() => removeWorker(row?._id)}>
          <Typography sx={{ fontSize: 12, color: colors.grey[100] }}>
            Remove Worker
          </Typography>
        </Button>
      </Stack>
    </Box>
  );
};

const WorkerManagement = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    {
      field: "username",
      headerName: "Username",
      flex: 1,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "verified",
      headerName: "Status",
      flex: 1,
      renderCell: StatusCellRenderer,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => <Actions {...params} updateData={fetchData} />,
    },
  ];

  const [workerData, setWorkerData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/admin/workers/getAllWorkers"
      );
      setWorkerData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box m="0 20px">
      <Header title="Worker's Data" subtitle="Managing the Worker's Data" />
      <Box
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
          rows={workerData}
          columns={columns}
          getRowId={(row) => row._id}
        />
      </Box>
    </Box>
  );
};

export default WorkerManagement;

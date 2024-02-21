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
      <Typography  >
      {row?.status ? "Verified" : "Unverified"}
      </Typography>
     
    </Stack>
  );
};

const Actions = ({ row, updateData }) => {
  const fetchData = async (id) => {
    try {
      await axios.put(`http://localhost:3000/admin/pickups/verifyPickup/${id}`);
      updateData(); // Update the DataGrid after the operation
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const removePickup = async (id) => {
    try {
      await axios.delete(
        `http://localhost:3000/admin/pickups/deletePickup/${id}`
      );
      updateData(); // Update the DataGrid after the operation
    } catch (error) {
      console.error("Error removing pickup:", error);
    }
  };

  return (
    <Box width={"100%"}>
      <Stack direction={"row"} gap={2}>
        <Button
          variant="contained"
          sx={{
            padding: 1,
            backgroundColor: row?.status === "verified" ? "#ff5252" : "#4CAF50",
          }}
          onClick={() => fetchData(row?._id)}
        >
          <Typography sx={{ fontSize: 12, color: colors.grey[100] }}>
            {row?.status === "verified" ? "Restrict" : "Verify"}
          </Typography>
        </Button>
        <Button
          variant="contained"
          sx={{
            padding: 1,
            backgroundColor: "#B71C1C",
          }}
          onClick={() => removePickup(row?._id)}
        >
          <Typography sx={{ fontSize: 12, color: colors.grey[100] }}>
            Remove Pickup
          </Typography>
        </Button>
      </Stack>
    </Box>
  );
};

const PickupManagement = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    {
      field: "workerId",
      headerName: "Worker ID",
      flex: 1,
    },
    {
      field: "location",
      headerName: "Location",
      flex: 1,
    },
    {
      field: "status",
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

  const [pickupData, setPickupData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/admin/pickups/getAllPickups');
      setPickupData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box m="0 20px">
      <Header title="Pickup Management" subtitle="Managing Pickups" />
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
          rows={pickupData}
          columns={columns}
          getRowId={(row) => row._id}
        />
      </Box>
    </Box>
  );
};

export default PickupManagement;

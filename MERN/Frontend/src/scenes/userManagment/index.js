import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Button, Stack, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import Header from '../../components/Header';

const StatusCellRenderer = ({ row }) => {
  return (
    <Stack direction={'row'} alignItems={'center'}>
      <Typography color={row?.verified ? 'green' : 'red'}>
        {row?.verified ? 'Verified' : 'Unverified'}
      </Typography>
    </Stack>
  );
};

const Actions = ({ row, updateData }) => {
  const fetchData = async (id) => {
    try {
      const response = await axios.put(`http://localhost:3000/admin/users/updateStatus/${id}`);
      const updatedUser = response.data;
      updateData(updatedUser);
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  return (
    <Box width={'100%'}>
      <Stack direction={'row'} gap={2}>
        <Button
          variant="contained"
          sx={{
            padding: 1,
            backgroundColor: row?.verified ? '#ff5252' : '#4CAF50',
          }}
          onClick={() => fetchData(row?._id)}
        >
          <Typography sx={{ fontSize: 12, color: 'white' }}>
            {row?.verified ? 'Restrict' : 'Verify'}
          </Typography>
        </Button>
      </Stack>
    </Box>
  );
};

const UserManagement = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    {
      field: 'username',
      headerName: 'Username',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
    },
    {
      field: 'verified',
      headerName: 'Status',
      flex: 1,
      cellRenderer: StatusCellRenderer,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => <Actions {...params} updateData={fetchData} />,
    },
  ];

  const [userData, setUserData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/admin/users/getAllUsers');
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box m="0 20px">
      <Header title="User's Data" subtitle="Managing the User's Data" />
      <Box
        m="40px 0 0 0"
        height="70vh"
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },
          '& .name-column--cell': {
            color: colors.greenAccent[300],
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: colors.blueAccent[700],
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: colors.primary[400],
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: colors.blueAccent[700],
          },
          '& .MuiCheckbox-root': {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={userData} columns={columns} getRowId={(row) => row._id} />
      </Box>
    </Box>
  );
};

export default UserManagement;

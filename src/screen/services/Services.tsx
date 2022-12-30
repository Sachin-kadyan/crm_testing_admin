import { Delete } from '@mui/icons-material';
import { Box, Chip, Stack, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React from 'react';
import AddServiceManually from './widgets/AddServiceManually';
import BulkServiceUpload from './widgets/BulkServiceUpload';

type Props = {};

const Services = (props: Props) => {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    {
      field: 'name',
      headerName: 'Name',
      width: 300,
      renderCell: (params) => {
        return <Typography fontWeight="500">{params.row.name}</Typography>;
      }
    },
    {
      field: 'departments',
      headerName: 'Departments',
      width: 500,
      editable: true,
      renderCell: (params) =>
        params.row.departments?.map((item: string) => {
          console.log(item);
          return (
            <Chip sx={{ marginRight: '0.8rem' }} label={item.toUpperCase()} />
          );
        })
    },
    {
      field: 'actions',
      headerName: 'Action',
      width: 170,
      editable: false,
      sortable: false,
      renderCell: () => (
        <Box display="flex" justifyContent="space-around">
          <Delete color="action" />
        </Box>
      ),
      filterable: false
    }
  ];

  //   const rows = doctors.map((item, index) => {
  //     return {
  //       name: item.name.toUpperCase(),
  //       departments: item.departments.map((id) => departmentMap.get(id)),
  //       id: index + 1
  //     };
  //   });

  return (
    <Stack height="85vh">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginY={3}
        sx={{ height: '5vh' }}
      >
        <Typography variant="h4">Services</Typography>
        <Box display="flex" width={'40%'} justifyContent="space-around">
          <AddServiceManually />
          <BulkServiceUpload />
        </Box>
      </Box>
      {/* <DataGrid
        checkboxSelection
        sx={{ background: 'white', p: 3 }}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        rows={}
      /> */}
    </Stack>
  );
};

export default Services;

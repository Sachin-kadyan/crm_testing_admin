import { Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { useEffect } from 'react';
import { getDepartmentsHandler } from '../../api/department/departmentHandler';
import useServiceStore from '../../store/serviceStore';
import AddDepartment from './widget/AddDepartment';

const Department = () => {
  const { departments } = useServiceStore();
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 250 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'parent', headerName: 'Parent', width: 200 }
  ];
  const rows = departments.map((item, index) => {
    return {
      name: item.name.toUpperCase(),
      parent: item.parent
        ? departments.find((dept) => dept._id === item.parent)?.name
        : 'None',
      id: index
    };
  });

  useEffect(() => {
    (async function () {
      await getDepartmentsHandler();
    })();
  }, []);

  return (
    <Stack height="85vh">
      <Box></Box>
      <Box
        display="flex"
        justifyContent="space-between"
        marginY={3}
        sx={{ height: '5vh' }}
      >
        <Typography variant="h4">Departments</Typography>
        <AddDepartment />
      </Box>
      <DataGrid
        checkboxSelection
        sx={{ background: 'white', p: 3 }}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[10]}
        rows={rows}
      />
    </Stack>
  );
};

export default Department;

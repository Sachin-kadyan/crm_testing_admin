import { Delete } from '@mui/icons-material';
import { Chip, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { getDepartmentsHandler } from '../../api/department/departmentHandler';
import useServiceStore from '../../store/serviceStore';
import AddDepartment from './widget/AddDepartment';

const Department = () => {
  const { departments } = useServiceStore();
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
      field: 'parent',
      headerName: 'Parent',
      width: 200,
      editable: true
    },
    {
      field: 'tags',
      headerName: 'Tags',
      width: 400,
      editable: true,
      renderCell: (params) =>
        params.row.tags.map((item: string) => {
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
      renderCell: (params) => (
        <Box display="flex" justifyContent="space-around">
          <Delete color="action" />
        </Box>
      ),
      filterable: false
    }
  ];
  const rows = departments.map((item, index) => {
    return {
      name: item.name.toUpperCase(),
      parent: item.parent
        ? departments
            .find((dept) => dept._id === item.parent)
            ?.name.toUpperCase()
        : '',
      id: index + 1,
      tags: item.tags
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
        pageSize={10}
        rowsPerPageOptions={[10]}
        rows={rows}
      />
    </Stack>
  );
};

export default Department;

import { Delete } from '@mui/icons-material';
import { Box, Chip, Stack, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { useEffect } from 'react';
import { getAllServicesHandler } from '../../api/service/serviceHandler';
import useServiceStore from '../../store/serviceStore';
import AddServiceManually from './widgets/AddServiceManually';
import BulkServiceUpload from './widgets/BulkServiceUpload';

type Props = {};

const Services = (props: Props) => {
  const { services, departments } = useServiceStore();

  const departmentNameReturner = (id: string) => {
    const departmentName = departments.find((element) => element._id === id);
    return departmentName!.name;
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    {
      field: 'name',
      headerName: 'Name',
      width: 400,
      renderCell: (params) => {
        return <Typography fontWeight="500">{params.row.name}</Typography>;
      }
    },
    {
      field: 'departments',
      headerName: 'Department',
      width: 200,
      editable: true,
      renderCell: (params) => {
        return (
          <Typography fontWeight="400" textTransform="uppercase">
            {params.row.departments}
          </Typography>
        );
      }
    },
    {
      field: 'departmentType',
      headerName: 'Department Type',
      width: 300
    },
    {
      field: 'tag',
      headerName: 'Tag',
      width: 170,
      editable: false,
      sortable: false,
      renderCell: (params) => <Chip label={params.row.tag} />,
      filterable: false
    }
  ];

  const rows = services.map((item: any, index: number) => {
    return {
      name: item.name.toUpperCase(),
      departments: departmentNameReturner(item.department),
      departmentType: item.departmentType,
      id: item.serviceId,
      tag: item.tag
    };
  });

  useEffect(() => {
    (async function () {
      await getAllServicesHandler();
    })();
  }, []);

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

export default Services;

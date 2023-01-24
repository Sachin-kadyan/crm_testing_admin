import { Box, Chip, Stack, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { getAllServicesHandler } from '../../api/service/serviceHandler';
import useServiceStore from '../../store/serviceStore';
import { iService } from '../../types/store/service';
import AddServiceManually from './widgets/AddServiceManually';
import BulkServiceUpload from './widgets/BulkServiceUpload';

type Props = {};

const Services = (props: Props) => {
  const { allServices, departments } = useServiceStore();

  const [pageNumber, setPageNumber] = useState<number>(0);

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

  const rows = allServices.services.map((item: iService, index: number) => {
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
      await getAllServicesHandler(pageNumber);
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
        onPageChange={() => setPageNumber((prev) => prev++)}
        pageSize={10}
        rowsPerPageOptions={[10]}
        rows={rows}
        page={pageNumber}
        paginationMode="server"
      />
    </Stack>
  );
};

export default Services;

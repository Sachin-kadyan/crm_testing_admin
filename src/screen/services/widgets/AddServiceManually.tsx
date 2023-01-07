import {
  Box,
  Button,
  Chip,
  Drawer,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React, { useEffect, useState } from 'react';
import useServiceStore from '../../../store/serviceStore';
import { getDepartmentsHandler } from '../../../api/department/departmentHandler';
import { iService } from '../../../types/store/service';
import { getServiceTagsHandler } from '../../../api/service/serviceHandler';
import PreviewDrawer from './PreviewDrawer';

type Props = {};

const AddServiceManually = (props: Props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const drawerWidth = 600;
  const { departments, serviceTags } = useServiceStore();
  const [newServices, setNewServices] = useState<iService>({
    name: '',
    serviceId: '',
    department: '',
    departmentType: '',
    tag: '',
    opdCharge: 0,
    ipdCharge: 0,
    fourSharingRoomCharge: 0,
    twinSharingRoomCharge: 0,
    singleRoomCharge: 0,
    deluxeRoomCharge: 0,
    vipRoomCharge: 0
  });
  const [serviceArray, setServiceArray] = useState<iService[]>([]);

  const handleNewService = () => {
    setServiceArray([...serviceArray, newServices]);
    setNewServices({
      name: '',
      serviceId: '',
      department: '',
      departmentType: '',
      tag: '',
      opdCharge: 0,
      ipdCharge: 0,
      fourSharingRoomCharge: 0,
      twinSharingRoomCharge: 0,
      singleRoomCharge: 0,
      deluxeRoomCharge: 0,
      vipRoomCharge: 0
    });
  };

  const checkFieldStatus = () => {
    if (
      newServices.name.length > 0 &&
      newServices.serviceId.length > 0 &&
      newServices.department.length > 0 &&
      newServices.departmentType.length > 0 &&
      newServices.opdCharge > 0 &&
      newServices.ipdCharge > 0 &&
      newServices.singleRoomCharge > 0 &&
      newServices.twinSharingRoomCharge > 0 &&
      newServices.fourSharingRoomCharge > 0 &&
      newServices.deluxeRoomCharge > 0 &&
      newServices.vipRoomCharge > 0
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };

  useEffect(() => {
    getDepartmentsHandler();
    getServiceTagsHandler();
  }, []);
  return (
    <Stack>
      <Button
        onClick={() => setIsDrawerOpen(true)}
        color="success"
        fullWidth
        variant="contained"
      >
        <AddIcon />
        Add Services Manually
      </Button>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth
          }
        }}
      >
        <Box p={3}>
          <Box display="flex" justifyContent="space-between">
            <Typography fontWeight={500} fontSize="1.5rem">
              Add Services
            </Typography>
            {serviceArray.length > 0 && (
              <PreviewDrawer
                setServiceArray={setServiceArray}
                serviceArray={serviceArray}
              />
            )}
          </Box>
          <Box
            marginY={2}
            width="100%"
            display="flex"
            justifyContent="space-between"
          >
            <TextField
              sx={{ width: '35ch' }}
              id="outlined-service-name"
              label="Enter Service Name"
              variant="outlined"
              onChange={(e) => {
                setNewServices({ ...newServices, name: e.target.value });
                checkFieldStatus();
              }}
            />
            <TextField
              id="outlined-service-id"
              label="Enter Service ID"
              variant="outlined"
              onChange={(e) => {
                setNewServices({ ...newServices, serviceId: e.target.value });
                checkFieldStatus();
              }}
            />
          </Box>
          <Box
            marginY={2}
            width="100%"
            display="flex"
            justifyContent="space-between"
          >
            <FormControl sx={{ width: '30ch' }}>
              <InputLabel id="demo-simple-select-label">Department</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                sx={{ textTransform: 'uppercase' }}
                label="Departments"
                value={newServices.department}
                onChange={(e) => {
                  setNewServices({
                    ...newServices,
                    department: e.target.value
                  });
                  checkFieldStatus();
                }}
              >
                <MenuItem value="none">None</MenuItem>
                {departments.map((item) => {
                  return (
                    item.parent === null && (
                      <MenuItem
                        value={item._id}
                        sx={{ textTransform: 'uppercase' }}
                        key={item._id}
                      >
                        {item.name}
                      </MenuItem>
                    )
                  );
                })}
              </Select>
            </FormControl>
            <FormControl sx={{ width: '30ch' }}>
              <InputLabel id="demo-simple-select-label">
                Department Type
              </InputLabel>
              <Select
                onChange={(e) => {
                  setNewServices({
                    ...newServices,
                    departmentType: e.target.value
                  });
                  checkFieldStatus();
                }}
                sx={{ textTransform: 'uppercase' }}
                value={newServices.departmentType}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Department Type"
              >
                {departments.map((item: any) => {
                  return (
                    item.parent && (
                      <MenuItem
                        value={item._id}
                        sx={{ textTransform: 'uppercase' }}
                        key={item._id}
                      >
                        {item.name}
                      </MenuItem>
                    )
                  );
                })}
              </Select>
            </FormControl>
          </Box>
          <Box
            marginY={2}
            width="100%"
            display="flex"
            justifyContent="space-between"
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Tags</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Tags"
                onChange={(e) => {
                  setNewServices({
                    ...newServices,
                    tag: e.target.value
                  });
                  checkFieldStatus();
                }}
                value={newServices.tag}
                sx={{ textTransform: 'uppercase' }}
              >
                {serviceTags.map((item: any) => {
                  return (
                    <MenuItem
                      value={item._id}
                      sx={{ textTransform: 'uppercase' }}
                      key={item._id}
                    >
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
          <Typography fontWeight={500} fontSize="1rem">
            Charges
          </Typography>
          <Grid
            marginTop={1}
            container
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <TextField
                sx={{ width: '30ch' }}
                id="outlined-opd-charges"
                label="Enter OPD Charges"
                variant="outlined"
                onChange={(e) => {
                  setNewServices({
                    ...newServices,
                    opdCharge: +e.target.value
                  });
                  checkFieldStatus();
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                sx={{ width: '30ch' }}
                id="outlined-ipd-charges"
                label="Enter IPD Charges"
                variant="outlined"
                onChange={(e) =>
                  setNewServices({ ...newServices, ipdCharge: +e.target.value })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                sx={{ width: '30ch' }}
                id="outlined-four-sharing"
                label="Enter Four Sharing Room Charges"
                variant="outlined"
                onChange={(e) => {
                  setNewServices({
                    ...newServices,
                    fourSharingRoomCharge: +e.target.value
                  });
                  checkFieldStatus();
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                sx={{ width: '30ch' }}
                id="outlined-twin-sharing"
                label="Enter Twin Sharing Room Charges"
                variant="outlined"
                onChange={(e) => {
                  setNewServices({
                    ...newServices,
                    twinSharingRoomCharge: +e.target.value
                  });
                  checkFieldStatus();
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                sx={{ width: '30ch' }}
                id="outlined-single-sharing"
                label="Enter Single Room Charges"
                variant="outlined"
                onChange={(e) => {
                  setNewServices({
                    ...newServices,
                    singleRoomCharge: +e.target.value
                  });
                  checkFieldStatus();
                }}
              />
            </Grid>{' '}
            <Grid item xs={6}>
              <TextField
                sx={{ width: '30ch' }}
                id="outlined-delux-sharing"
                label="Enter Delux Room Charges"
                variant="outlined"
                onChange={(e) =>
                  setNewServices({
                    ...newServices,
                    deluxeRoomCharge: +e.target.value
                  })
                }
              />
            </Grid>{' '}
            <Grid item xs={6}>
              <TextField
                sx={{ width: '30ch' }}
                id="outlined-four-sharing"
                label="Enter VIP Room Charges"
                variant="outlined"
                onChange={(e) => {
                  setNewServices({
                    ...newServices,
                    vipRoomCharge: +e.target.value
                  });
                  checkFieldStatus();
                }}
              />
            </Grid>
          </Grid>
          <Button
            disabled={isButtonDisabled}
            onClick={handleNewService}
            sx={{ marginTop: 4 }}
            variant="contained"
            color="success"
          >
            Add Service
          </Button>
        </Box>
      </Drawer>
    </Stack>
  );
};

export default AddServiceManually;

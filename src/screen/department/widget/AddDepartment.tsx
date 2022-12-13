import {
  Button,
  Modal,
  TextField,
  Typography,
  Box,
  Select,
  MenuItem,
  Stack,
  IconButton,
  InputLabel,
  FormControl
} from '@mui/material';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import useServiceStore from '../../../store/serviceStore';
import { iDepartment } from '../../../types/store/service';
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};
const AddDepartment = () => {
  const { departments } = useServiceStore();
  const [openModal, setOpenModal] = useState(false);
  const [newDept, setNewDept] = useState<iDepartment>({
    name: '',
    parent: '',
    tags: []
  });
  const handleDepartmentTagChange = (value: string[]) => {
    if (value) setNewDept({ ...newDept, tags: value });
  };
  return (
    <>
      <Button
        variant="contained"
        color="success"
        onClick={() => setOpenModal(true)}
      >
        <AddIcon />
        Add New
      </Button>
      <Modal
        sx={{ border: 0 }}
        open={openModal}
        onClose={() => setOpenModal(false)}
      >
        <Stack padding={3} sx={style}>
          <Typography marginY={3} variant="h5" fontWeight={600}>
            Add New Department
          </Typography>
          <TextField
            value={newDept.name}
            onChange={(e) => setNewDept({ ...newDept, name: e.target.value })}
            fullWidth
            label="Department Name"
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Select Parent</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Select Parent"
              value={newDept.parent}
              onChange={(e) =>
                setNewDept({ ...newDept, parent: e.target.value })
              }
            >
              <MenuItem value={''}>None</MenuItem>
              {departments.map((item) => {
                return (
                  <MenuItem key={item._id} value={item._id}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Select Tags</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Select Tags"
              value={newDept.tags}
              onChange={(e) =>
                handleDepartmentTagChange(e.target.value as string[])
              }
            >
              <MenuItem value={''}>None</MenuItem>
              {departments.map((item) => {
                return (
                  <MenuItem key={item._id} value={item._id}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Select
            multiple
            value={newDept.tags}
            onChange={(e) =>
              handleDepartmentTagChange(e.target.value as string[])
            }
            fullWidth
            placeholder="Department Tags"
            label="Department Tags"
          >
            <MenuItem value={''}>None</MenuItem>
            {departments.map((item) => {
              return (
                <MenuItem key={item._id} value={item._id}>
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
          <Button color="success" fullWidth variant="contained">
            Add
          </Button>
        </Stack>
      </Modal>
    </>
  );
};

export default AddDepartment;

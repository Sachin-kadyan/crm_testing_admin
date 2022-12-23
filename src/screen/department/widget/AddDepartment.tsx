import {
  Button,
  Modal,
  TextField,
  Typography,
  Box,
  Select,
  MenuItem,
  Stack,
  FormControl,
  InputLabel
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
import { getDepartmentTagsHandler } from '../../../api/department/departmentHandler';
import { createDepartment } from '../../../api/department/department';
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
  borderRadius: '1rem',
  borderWidth: 0,
  p: 4
};
const AddDepartment = () => {
  const { departments, departmentTags } = useServiceStore();
  const [openModal, setOpenModal] = useState(false);
  const [newDept, setNewDept] = useState<iDepartment>({
    name: '',
    parent: '',
    tags: []
  });

  const addNewDepartment = async () => {
    await createDepartment(newDept.name, newDept.parent, newDept.tags);
  };

  const handleDepartmentTagChange = (value: string[]) => {
    if (value) setNewDept({ ...newDept, tags: value });
  };

  useEffect(() => {
    (async function () {
      await getDepartmentTagsHandler();
    })();
  }, []);
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
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Stack padding={3} sx={style} spacing={3}>
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
              multiple
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Select Tags"
              value={newDept.tags}
              onChange={(e) =>
                handleDepartmentTagChange(e.target.value as string[])
              }
            >
              <MenuItem value={''}>None</MenuItem>
              {departmentTags.map((item) => {
                return (
                  <MenuItem key={item._id} value={item._id}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Button
            onClick={addNewDepartment}
            color="success"
            fullWidth
            variant="contained"
          >
            Add
          </Button>
        </Stack>
      </Modal>
    </>
  );
};

export default AddDepartment;

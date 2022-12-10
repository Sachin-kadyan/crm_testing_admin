import { Button, Modal, TextField, Typography, Box, Select, MenuItem } from "@mui/material";
import { useState } from "react";
import useServiceStore from "../../../store/serviceStore";
import { iDepartment } from "../../../types/store/service";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const AddDepartment = () => {
  const { departments } = useServiceStore();
  const [openModal, setOpenModal] = useState(false);
  const [newDept, setNewDept] = useState<iDepartment>({
    name: "",
    parent: "",
    tags: [],
  });
  const handleDepartmentTagChange = (value: string[]) => {
    if (value) setNewDept({ ...newDept, tags: value });
  };
  return (
    <>
      <Button variant="contained" onClick={() => setOpenModal(true)}>
        Add New
      </Button>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={style}>
          <Typography>Add New Department</Typography>
          <TextField
            value={newDept.name}
            onChange={(e) => setNewDept({ ...newDept, name: e.target.value })}
            fullWidth
            placeholder="Department Name"
            label="Department Name"
          />
          <Select
            placeholder="Parent Department"
            value={newDept.parent}
            onChange={(e) => setNewDept({ ...newDept, parent: e.target.value })}
            fullWidth
            label="Parent Department"
          >
            <MenuItem value={""}>no parent</MenuItem>
            {departments.map((item) => {
              return (
                <MenuItem key={item._id} value={item._id}>
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
          <Select
            multiple
            value={newDept.tags}
            onChange={(e) => handleDepartmentTagChange(e.target.value as string[])}
            fullWidth
            placeholder="Department Tags"
            label="Department Tags"
          >
            <MenuItem value={""}>None</MenuItem>
            {departments.map((item) => {
              return (
                <MenuItem key={item._id} value={item._id}>
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
          <Button fullWidth variant="contained">
            Add
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default AddDepartment;

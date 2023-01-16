import { AddCircleOutlineOutlined } from '@mui/icons-material';
import {
  Autocomplete,
  Box,
  Button,
  Drawer,
  Stack,
  TextareaAutosize,
  TextField,
  Typography
} from '@mui/material';
import React, { useState } from 'react';
import { createScript } from '../../../api/script/script';
import useServiceStore from '../../../store/serviceStore';
import { iScript } from '../../../types/store/service';

type Props = {};

const drawerWidth = 600;

const AddScript = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { services, stages } = useServiceStore();
  const [script, setScript] = useState<iScript>({
    text: '',
    service: '',
    stage: ''
  });

  const handleAddScript = async () => {
    await createScript(script);
    setScript({
      text: '',
      service: '',
      stage: ''
    });
  };

  return (
    <Box>
      <Button
        variant="contained"
        color="success"
        onClick={() => setIsOpen(true)}
        endIcon={<AddCircleOutlineOutlined />}
      >
        Add New
      </Button>
      <Drawer
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth
          }
        }}
        anchor="right"
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <Box borderBottom={1} borderColor="#f5f5f5" p={2}>
          <Typography variant="h6" fontWeight={500}>
            Create Agent Script
          </Typography>
        </Box>
        <Stack p={2} direction="row" spacing={2}>
          <Autocomplete
            aria-required={true}
            options={services}
            id="combo-box-demo"
            getOptionLabel={(option) => option.name}
            onChange={(event, value) =>
              setScript({ ...script, service: value?._id! })
            }
            sx={{ width: 400, textTransform: 'capitalize' }}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{ textTransform: 'capitalize' }}
                label="Select Surgery"
              />
            )}
          />
          <Autocomplete
            aria-required={true}
            options={stages}
            onChange={(event, value) =>
              setScript({ ...script, stage: value?._id! })
            }
            id="combo-box-demo"
            getOptionLabel={(option) => option.name}
            sx={{ width: 400, textTransform: 'capitalize' }}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{ textTransform: 'capitalize' }}
                label="Select Stage"
              />
            )}
          />
        </Stack>
        <Box p={2}>
          <TextareaAutosize
            placeholder="Enter Script"
            minRows={20}
            style={{
              border: '1px solid #999',
              width: '100%',
              padding: '1rem',
              borderRadius: 5
            }}
            onChange={(e) => {
              setScript({ ...script, text: e.target.value });
            }}
          />
        </Box>
        <Box p={2}>
          <Button onClick={handleAddScript} variant="contained">
            Upload Script
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
};

export default AddScript;

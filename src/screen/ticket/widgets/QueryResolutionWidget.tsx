import { Add, Close } from '@mui/icons-material';
import {
  Autocomplete,
  Box,
  Button,
  Stack,
  TextareaAutosize,
  TextField
} from '@mui/material';

import React, { useState } from 'react';
import useServiceStore from '../../../store/serviceStore';
import { iDepartment } from '../../../types/store/service';

import { doc, setDoc } from 'firebase/firestore';
import { database } from '../../../utils/firebase';

type Props = {};

const QueryResolutionWidget = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [queryTitle, setQueryTitle] = useState('');
  const [queryDepartment, setQueryDepartment] = useState('');
  const [queryMessage, setQueryMessage] = useState('');

  const { departments } = useServiceStore();

  const collectionRef = doc(database, 'queries');
  console.log(collectionRef);

  return (
    <Box height="95%" position="relative" p={1} bgcolor="white">
      <Box height="90%"></Box>
      <Box
        sx={{
          transition: '400ms ease-in-out'
        }}
        p={2}
        borderRadius="10px 10px 0px 0px"
        height={isOpen ? '60%' : '15%'}
        position="sticky"
        bottom={isOpen ? 20 : 1}
        bgcolor="#f1f5f7"
      >
        <Box my={1}>
          <Button
            onClick={() => setIsOpen((prev) => !prev)}
            endIcon={isOpen ? <Close /> : <Add />}
          >
            {isOpen ? 'Close' : 'Create New Query'}
          </Button>
        </Box>

        {isOpen && (
          <Stack spacing={2} direction="column" height="100%" p={1}>
            <Autocomplete
              fullWidth
              size="small"
              aria-required={true}
              options={departments}
              onChange={(event, value) => setQueryDepartment(value?._id!)}
              id="combo-box-demo"
              getOptionLabel={(option: iDepartment) => option.name}
              sx={{ width: 400, textTransform: 'capitalize' }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{ textTransform: 'capitalize' }}
                  label="Select Department"
                />
              )}
            />
            <TextField
              label="Enter Query Title"
              size="small"
              fullWidth
              onChange={(e) => setQueryTitle(e.target.value)}
            />

            <TextareaAutosize
              aria-label="empty textarea"
              placeholder="Enter Message"
              minRows={3}
              style={{
                padding: '7px',
                outline: 'solid 1px #999',
                background: 'transparent',
                borderRadius: '5px'
              }}
            />
            <Button variant="contained">Create Query Room</Button>
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default QueryResolutionWidget;

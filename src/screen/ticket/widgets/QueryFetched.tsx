import { Box, Chip, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';
import useServiceStore from '../../../store/serviceStore';
import { iDepartment } from '../../../types/store/service';

type Props = {
  id: string;
  subject: string;
  departmentId: string;
  createdAt: {
    seconds: number;
  };
  onClick: any;
};

const QueryFetched = (props: Props) => {
  const { departments } = useServiceStore();

  const departmentSetter = (departmentId: string) => {
    return departments.find(
      (department: iDepartment) => department._id === departmentId
    )?.name;
  };

  return (
    <Box my={1} p={1} bgcolor="#f1f5f7" onClick={props.onClick}>
      <Typography>{props.subject}</Typography>
      <Stack direction="row" spacing={2}>
        {props.departmentId && (
          <Chip
            sx={{ textTransform: 'uppercase' }}
            size="small"
            label={departmentSetter(props.departmentId)}
          />
        )}

        <Chip
          size="small"
          label={dayjs(props.createdAt.seconds * 1000).format(
            'DD MMM YYYY hh:mm A'
          )}
        />
      </Stack>
    </Box>
  );
};

export default QueryFetched;

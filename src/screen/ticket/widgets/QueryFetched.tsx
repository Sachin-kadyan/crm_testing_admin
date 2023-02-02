import { ContactSupportOutlined } from '@mui/icons-material';
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
    <Stack
      spacing={2}
      direction="column"
      my={1}
      p={1}
      bgcolor="#f1f5f7"
      onClick={props.onClick}
    >
      <Stack direction="row" spacing={1}>
        <ContactSupportOutlined />
        <Typography fontWeight={500}>{props.subject}</Typography>
      </Stack>
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
    </Stack>
  );
};

export default QueryFetched;

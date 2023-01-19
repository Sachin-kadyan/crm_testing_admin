import { Box, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { searchConsumerHandler } from '../../../api/consumer/consumerHandler';
import useConsumerStore from '../../../store/consumerStore';

const Search = () => {
  const [search, setSearch] = useState('');
  const { searchResults } = useConsumerStore();

  return (
    <Box>
      <Box bgcolor="primary.main" p={2}>
        <TextField
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          color="info"
          label="Search Patient"
          onBlur={(e) => searchConsumerHandler(e.target.value)}
          fullWidth
        />
      </Box>
      <Box p={0.5}>
        {searchResults.map((item) => {
          return (
            <Box bgcolor="primary.light" borderRadius={1} p={1} key={item._id}>
              <Link to={`/consumer/${item._id}`}>
                <Stack flexDirection="row" justifyContent="space-between">
                  <Typography>
                    {item.firstName} {item.lastName}
                  </Typography>
                  <Typography>{item.phone}</Typography>
                </Stack>
                <Stack flexDirection="row" justifyContent="space-between">
                  <Typography>UHID: {item.uid}</Typography>
                  <Typography>{item.gender}</Typography>
                </Stack>
                <Stack>
                  <Typography>{item.email}</Typography>
                </Stack>
                <Stack>
                  <Typography>
                    {item.address.house} {item.address.city}{' '}
                    {item.address.state} {item.address.postalCode}
                  </Typography>
                </Stack>
              </Link>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Search;

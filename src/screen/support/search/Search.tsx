import { SearchOutlined } from '@mui/icons-material';
import {
  Box,
  CardContent,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography
} from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { searchConsumerHandler } from '../../../api/consumer/consumerHandler';
import useConsumerStore from '../../../store/consumerStore';
import BackHeader from '../widgets/BackHeader';

const Search = () => {
  const [search, setSearch] = useState('');
  const { searchResults } = useConsumerStore();

  return (
    <Box>
      <BackHeader title="Search Patient" />
      <Box px={1} py={1}>
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Search Patient
          </InputLabel>
          <OutlinedInput
            value={search}
            label="Search Patient"
            onChange={(e) => setSearch(e.target.value)}
            onBlur={(e) => searchConsumerHandler(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                searchConsumerHandler(search);
              }
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => searchConsumerHandler(search)}
                  edge="end"
                >
                  <SearchOutlined />
                </IconButton>
              </InputAdornment>
            }
            fullWidth
          />
        </FormControl>
      </Box>
      <Box p={0.5}>
        {searchResults.map((item) => {
          return (
            <Box
              bgcolor="primary.light"
              borderRadius={1}
              my={0.4}
              key={item._id}
            >
              <Link to={`/consumer/${item._id}`}>
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary">
                    UHID {item.uid}
                  </Typography>
                  <Typography
                    textTransform="capitalize"
                    variant="h5"
                    component="div"
                  >
                    {item.firstName +
                      ' ' +
                      (item.lastName ? item.lastName : '')}
                  </Typography>
                  <Typography color="text.secondary">
                    {item.gender === 'M'
                      ? 'Male'
                      : item.gender === 'F'
                      ? 'Female'
                      : item.gender === 'O'
                      ? 'Other'
                      : 'Not Specified'}
                  </Typography>
                  <Typography variant="body2">{item.email}</Typography>
                </CardContent>
              </Link>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Search;

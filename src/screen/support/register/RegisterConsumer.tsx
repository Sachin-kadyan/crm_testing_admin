import { PersonAddAlt1Outlined } from '@mui/icons-material';
import {
  Box,
  Stack,
  TextField,
  Button,
  FormHelperText,
  Typography,
  Avatar
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerConsumerHandler } from '../../../api/consumer/consumerHandler';
import useEventStore from '../../../store/eventStore';
const initialConsumerFields = {
  firstName: '',
  lastName: '',
  email: null,
  phone: '',
  uid: '',
  age: '',
  gender: ''
};
const defaultValidations = { message: '', value: false };

const initialValidationsFields = {
  firstName: defaultValidations,
  lastName: defaultValidations,
  email: defaultValidations,
  phone: defaultValidations,
  uid: defaultValidations,
  age: defaultValidations,
  gender: defaultValidations
};

const RegisterConsumer = () => {
  const [consumer, setConsumer] = useState(initialConsumerFields);
  const [validations, setValidations] = useState(initialValidationsFields);
  const { setSnacks } = useEventStore();
  const navigate = useNavigate();

  const validationsChecker = () => {
    const firstName = consumer.firstName === initialConsumerFields.firstName;
    // const lastName = consumer.lastName === initialConsumerFields.lastName;

    const phone = consumer.phone.length !== 10;
    const uid = consumer.uid === initialConsumerFields.uid;
    // const age = consumer.age === initialConsumerFields.age;
    // const gender = consumer.gender === initialConsumerFields.gender;
    setValidations((prev) => {
      prev.firstName = firstName
        ? { message: 'Please enter correct first name', value: true }
        : defaultValidations;
      // prev.lastName = lastName
      //   ? { message: 'Please enter correct last name', value: true }
      //   : defaultValidations;
      // prev.email = email
      //   ? { message: 'Please enter correct email', value: true }
      //   : defaultValidations;
      prev.phone = phone
        ? { message: 'Please enter correct phone number', value: true }
        : defaultValidations;
      prev.uid = uid
        ? { message: 'Please enter correct UHID', value: true }
        : defaultValidations;
      // prev.age = age
      //   ? { message: 'Please enter correct age', value: true }
      //   : defaultValidations;
      // prev.gender = gender
      //   ? { message: 'Please enter correct gender', value: true }
      //   : defaultValidations;
      return { ...prev };
    });
    return (
      firstName === false &&
      // lastName === false &&
      // email === false &&
      phone === false &&
      uid === false
      // age === false &&
      // gender === false
    );
  };

  const registerConsumer = async () => {
    const check = validationsChecker();
    if (check === true) {
      const dob = new Date();
      dob.setFullYear(dob.getFullYear() - +consumer.age);
      // const email = consumer.email
      //   ? consumer.email.match(
      //       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      //     ) === null
      //   : true;
      const consumerPayload: any = consumer;
      // consumerPayload.email = email ? null : consumer.email;
      consumerPayload.lastName = consumer.lastName ? consumer.lastName : null;
      consumerPayload.gender = consumer.gender ? consumer.gender : null;
      consumerPayload.dob = consumer.age ? dob : null;
      await registerConsumerHandler(consumerPayload);
      setConsumer({ ...initialConsumerFields });
      setSnacks('Patient Registered Successfully!', 'success');
      navigate('/');
    }
  };

  const updateConsumerState = (field: string, value: any) => {
    setConsumer((prev: any) => {
      prev[field] = value;
      return { ...prev };
    });
  };

  return (
    <Box>
      {/* <BackHeader title="Register" /> */}
      <Stack
        direction="row"
        spacing={2}
        borderRadius="0rem 0rem 1rem 1rem"
        p={1}
        bgcolor="primary.main"
        height={'15vh'}
        mb={2}
      >
        <Avatar>
          <PersonAddAlt1Outlined />
        </Avatar>
        <Stack>
          <Typography color="white" variant="h6">
            Patient Registration
          </Typography>
          <Typography variant="body2" color="lightgray">
            Register Patient here for further tasks on the registered patient
          </Typography>
        </Stack>
      </Stack>
      <Stack p={1} spacing={2} height="80vh">
        <Stack direction="row" spacing={2}>
          <TextField
            value={consumer.firstName}
            onChange={(e) => updateConsumerState('firstName', e.target.value)}
            fullWidth
            size="small"
            type="text"
            placeholder="Jhon"
            label="First Name"
            error={validations.firstName.value}
            helperText={validations.firstName.message}
          />
          <TextField
            value={consumer.lastName}
            onChange={(e) => updateConsumerState('lastName', e.target.value)}
            fullWidth
            size="small"
            type="text"
            placeholder="Doe"
            label="Last Name (optional)"
            error={validations.lastName.value}
            helperText={validations.lastName.message}
          />
        </Stack>
        {/* <TextField
          value={consumer.email}
          onChange={(e) => updateConsumerState('email', e.target.value)}
          fullWidth
          size="small"
          type="email"
          placeholder="Jhondoe@gmail.com"
          label="Email Address"
          error={validations.email.value}
          helperText={validations.email.message}
        /> */}
        <TextField
          value={consumer.phone}
          onChange={(e) => updateConsumerState('phone', e.target.value)}
          fullWidth
          type="tel"
          size="small"
          placeholder="8979XXXXXX"
          label="Phone Number"
          error={validations.phone.value}
          helperText={validations.phone.message}
        />
        <TextField
          value={consumer.uid}
          onChange={(e) => updateConsumerState('uid', e.target.value)}
          fullWidth
          size="small"
          type="text"
          placeholder="33XXX"
          label="UHID"
          error={validations.uid.value}
          helperText={validations.uid.message}
        />
        <TextField
          value={consumer.age}
          onChange={(e) => updateConsumerState('age', e.target.value)}
          fullWidth
          size="small"
          type="number"
          placeholder="32"
          label="Age  (optional)"
          error={validations.age.value}
          helperText={validations.age.message}
        />
        {/* <Typography color="GrayText">Select Gender</Typography>
        <Stack spacing={2} direction="row">
          <Paper
            onClick={() => {
              updateConsumerState('gender', 'M');
            }}
            elevation={1}
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: consumer.gender === 'M' ? 'primary' : 'white'
            }}
            square
          >
            <MaleOutlined />
          </Paper>
          <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }} square>
            <FemaleOutlined />
          </Paper>
          <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }} square>
            <TransgenderOutlined />
          </Paper>
        </Stack> */}
        <Box>
          <Typography sx={{ my: 1 }} color="CaptionText">
            Gender (optional)
          </Typography>
          <Stack flexDirection="row" alignItems="center">
            {[
              { label: 'Male', value: 'M' },
              { label: 'Female', value: 'F' },
              { label: 'Other', value: 'O' }
            ].map((item) => {
              return (
                <Button
                  size="small"
                  sx={{ mr: 1 }}
                  variant={
                    item.value === consumer.gender ? 'contained' : 'outlined'
                  }
                  onClick={() => updateConsumerState('gender', item.value)}
                >
                  {item.label}
                </Button>
              );
            })}
          </Stack>
          <FormHelperText error={validations.gender.value}>
            {validations.gender.message}
          </FormHelperText>
        </Box>
        <Button size="large" onClick={registerConsumer} variant="contained">
          Register
        </Button>
      </Stack>
    </Box>
  );
};

export default RegisterConsumer;

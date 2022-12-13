import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { useState } from 'react';
import loginBg from '../../assets/images/login-bg.png';
import { loginHandler } from '../../api/auth/authHandler';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState({
    secret: '',
    show: false
  });

  const handleClickShowPassword = () => {
    setPassword({ ...password, show: !password.show });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Stack
      direction="row"
      spacing={10}
      sx={{ height: '100vh', width: '100vw', background: '#226D4A' }}
    >
      <Stack
        sx={{
          width: '50%',
          backgroundImage: `url(${loginBg})`,
          height: '100vh',
          backgroundPosition: 'right',
          backgroundSize: 'cover'
        }}
      ></Stack>

      <Stack sx={{ width: '50%', padding: '2rem' }}>
        <Typography variant="h2" color="white" fontWeight="bold">
          OCTA
        </Typography>
        <Typography variant="h5" color="white" fontWeight="bold">
          A Patient Conversion Healthcare Tool
        </Typography>
        <Stack
          boxShadow={5}
          padding={10}
          justifyContent="center"
          sx={{
            background: 'white'
          }}
          borderRadius={5}
          marginTop={10}
        >
          <Typography variant="h4" color="#226D4A" fontWeight="bold">
            Welcome Back !
          </Typography>
          <Typography variant="subtitle1" color="#226D4A" fontWeight="bold">
            Please Enter You Details to Login into your account
          </Typography>
          <TextField
            color="success"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            label="Email Address"
          />
          <FormControl color="success" margin="normal" variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={password.show ? 'text' : 'password'}
              value={password.secret}
              onChange={(e) =>
                setPassword({ ...password, secret: e.target.value })
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {password.show ? (
                      <VisibilityOff color="success" />
                    ) : (
                      <Visibility color="success" />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <Button
            sx={{
              marginTop: '1rem',
              padding: '0.8rem'
            }}
            variant="contained"
            color="success"
            onClick={() => loginHandler(email, password.secret)}
          >
            Login
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Login;

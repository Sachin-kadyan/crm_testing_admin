import { Button, FormControl, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { loginHandler } from "../../api/auth/authHandler";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Box sx={{ height: "100vh" }}>
      <Grid sx={{ height: "100%" }} direction="row" alignItems="center" container>
        <Grid item xs={4} sx={{ p: 2, height: "100%" }}>
          <FormControl fullWidth>
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              fullWidth
              variant="outlined"
              placeholder="Email Address"
              label="Email Address"
            />
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              fullWidth
              variant="outlined"
              placeholder="Password"
              label="Password"
            />
            <Button variant="contained" onClick={() => loginHandler(email, password)}>
              Login
            </Button>
          </FormControl>
        </Grid>
        <Grid item xs={8} />
      </Grid>
    </Box>
  );
};

export default Login;

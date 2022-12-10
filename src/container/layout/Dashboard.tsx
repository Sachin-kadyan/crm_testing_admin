import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import MainMenu from "../menu/MainMenu";

const Dashboard = () => {
  return (
    <Grid container>
      <Grid item xs={2}>
        <MainMenu />
      </Grid>
      <Grid item xs={10}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default Dashboard;

import { Button, Box, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import RoutePaths from "../helpers/RoutePaths";
import React from "react";

const Home = () => {
  return (
    <Paper elevation={1} sx={{ textAlign: "center", padding: 1 }}>
      <Box m={8}>
        <Typography variant="h3">Home</Typography>
        <Box m={3}>
          <Button variant="outlined" component={Link} to={RoutePaths.users}>
            Users
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default Home;

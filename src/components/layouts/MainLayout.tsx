import React from "react";
import { Outlet } from "react-router-dom";
import TopBar from "../common/TopBar";
import { Box, Container } from "@mui/material";

const MainLayout: React.FC = () => {
  return (
    <Box>
      <TopBar />
      <Container maxWidth="md">
        <Outlet />
      </Container>
    </Box>
  );
};

export default MainLayout;

import React from "react";
import Logo from "./Logo";
import { Box, Drawer, IconButton, Toolbar, Typography } from "@mui/material";

import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { changeTheme } from "../../redux/features/themeSlice";

interface propsType {
  open: boolean;
  handleClose: () => void;
}

const SideBar: React.FC<propsType> = ({ open, handleClose }) => {
  const mode = useSelector((state: RootState) => state.themeSlice.mode);
  const dispatch = useDispatch();

  const drawer = (
    <>
      <Toolbar
        sx={{
          paddingY: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Logo />
      </Toolbar>
      <Box paddingX="30px" display="flex" alignItems="center">
        <Typography variant="h6">Theme: </Typography>
        <Box>
          {mode === "dark" ? (
            <IconButton onClick={() => dispatch(changeTheme("light"))}>
              <WbSunnyOutlinedIcon />
            </IconButton>
          ) : (
            <IconButton onClick={() => dispatch(changeTheme("dark"))}>
              <DarkModeOutlinedIcon />
            </IconButton>
          )}
        </Box>
      </Box>
    </>
  );
  return (
    <Drawer open={open} onClose={handleClose}>
      {drawer}
    </Drawer>
  );
};

export default SideBar;

import {
  AppBar,
  Box,
  Container,
  IconButton,
  InputAdornment,
  LinearProgress,
  Stack,
  TextField,
  Toolbar,
} from "@mui/material";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { changeTheme } from "../../redux/features/themeSlice";
import { getQuery } from "../../redux/features/todoSlice";
import Logo from "./Logo";
import SideBar from "./SideBar";

const TopBar: React.FC = () => {
  const mode = useSelector((state: RootState) => state.themeSlice.mode);
  const loading = useSelector((state: RootState) => state.loadingSlice.loading);
  const [query, setQuery] = useState("");
  const [openSideBar, setOpenSideBar] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleGetQuery = (query: string) => {
      dispatch(getQuery(query));
    };
    handleGetQuery(query);
  }, [query, dispatch]);

  const handleClose = () => setOpenSideBar(!openSideBar);

  return (
    <>
      <SideBar open={openSideBar} handleClose={handleClose} />
      <AppBar position="relative" color="default" sx={{ mb: 2 }}>
        <Container maxWidth="md">
          <Toolbar variant="dense" disableGutters>
            <Stack
              width="100%"
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  sx={{ mr: 1, display: { xs: "inline-flex", sm: "none" } }}
                  onClick={handleClose}
                >
                  <MenuOutlinedIcon />
                </IconButton>
                <Logo />
                <Box sx={{ ml: 2, display: { xs: "none", sm: "block" } }}>
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
                {/* <Box sx={{ ml: 1 }}>
                <SwitchTheme />
              </Box> */}
              </Box>
              <Box ml={2}>
                <TextField
                  size="small"
                  variant="standard"
                  placeholder="Search..."
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </Box>
            </Stack>
          </Toolbar>
        </Container>
        {loading && (
          <Box sx={{ position: "absolute", left: 0, bottom: 0, width: "100%" }}>
            <LinearProgress />
          </Box>
        )}
      </AppBar>
    </>
  );
};

export default TopBar;

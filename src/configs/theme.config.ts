import { colors, createTheme } from "@mui/material";
import { themeMode } from "../redux/features/themeSlice";

export const themeConfig = {
  themeMode: ({ mode }: themeMode) => {
    const customeTheme =
      mode === "dark"
        ? {
            primary: {
              main: "#ff0000",
              contrastText: "#ffffff",
            },
            secondary: {
              main: "#f44336",
              contrastText: "#ffffff",
            },
            background: {
              default: "#000000",
              paper: "#131313",
            },
          }
        : {
            primary: {
              main: "#ff0000",
              contrastText: "#000000",
            },
            secondary: {
              main: "#f44336",
              contrastText: "#ffffff",
            },
            background: {
              default: colors.grey["100"],
              paper: "#ffffff",
            },
          };
    return createTheme({
      palette: {
        mode,
        ...customeTheme,
      },
    });
  },
};

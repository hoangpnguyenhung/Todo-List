import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./routes/routes";
import MainLayout from "./components/layouts/MainLayout";
import { ThemeProvider } from "@mui/material";
import { themeConfig } from "./configs/theme.config";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

const App: React.FC = () => {
  const mode = useSelector((state: RootState) => state.themeSlice.mode);
  return (
    <ThemeProvider theme={themeConfig.themeMode({ mode })}>
      <div className="App">
        {/* reset css */}
        <CssBaseline />
        {/* reset css */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              {routes.map((route, index) =>
                route.index ? (
                  <Route index element={route.element} key={index} />
                ) : (
                  <Route
                    path={route.path}
                    element={route.element}
                    key={index}
                  />
                )
              )}
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
};

export default App;

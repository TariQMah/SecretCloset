import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "theme";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import SignIn from "scenes/login";
import AddSpotted from "scenes/addSpotted";
import Spotted from "scenes/spotted";


function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />


          <Routes>
            <Route path="/sign-in" element={<SignIn />} />
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />

              <Route path="/spotted" element={<Spotted />} />
              <Route path="/spotted/add" element={<AddSpotted />} />

            </Route>
          </Routes>




        </ThemeProvider>
      </BrowserRouter>
    </div>

  );
}


export default App;

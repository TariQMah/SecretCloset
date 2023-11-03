import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "theme";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import SignIn from "scenes/login";
import AddSpotted from "scenes/addSpotted";
import Spotted from "scenes/spotted";
import Designer from "scenes/designer";
import AddDesigner from "scenes/addDesigner";
import { useGetAllSpottedCategoriesQuery } from "state/api";
import { setSpottedCategories } from "state/commons";


function App() {
  const dispatch = useDispatch();

  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);


  const { data, isLoading } = useGetAllSpottedCategoriesQuery();


  useEffect(() => {
    if (!isLoading) {
      dispatch(setSpottedCategories(data?.categories))
    }
  }, [data, isLoading]);

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


              <Route path="/designer" element={<Designer />} />
              <Route path="/designer/add" element={<AddDesigner />} />

            </Route>
          </Routes>




        </ThemeProvider>
      </BrowserRouter>
    </div>

  );
}


export default App;

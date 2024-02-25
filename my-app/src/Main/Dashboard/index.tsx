import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

import { Outlet } from "react-router";
import NavBaar from "./NavBaar";
import SideBaar from "./SideBaar";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <NavBaar open={open} toggleDrawer={toggleDrawer} />
        <SideBaar open={open} toggleDrawer={toggleDrawer} />
        <Outlet />
      </Box>
    </ThemeProvider>
  );
}

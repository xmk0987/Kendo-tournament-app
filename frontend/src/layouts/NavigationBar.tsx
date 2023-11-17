/*
  Much of the code comes from the corresponding MUI examples that are MIT licensed.
  https://github.com/mui/material-ui/blob/v5.14.18/docs/data/material/components/app-bar/DrawerAppBar.tsx
  https://github.com/mui/material-ui/blob/v5.14.18/docs/data/material/components/app-bar/ResponsiveAppBar.tsx
*/
import React from "react";
import { NavLink, Outlet } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";

import MenuIcon from "@mui/icons-material/Menu";

import NavigationDrawer from "./NavigationDrawer";
import NavigationUserMenu from "./NavigationUserMenu";
// Text to display in the hamburger menu, navbar and the corresponding link
// -,- in the menu and the corresponding link
import { navigationItems, settings } from "./navigationdata";

interface Props {
  window?: () => Window;
}

const NavigationBar: React.FC<Props> = (props) => {
  const { window } = props;

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const [openDrawer, setOpenDrawer] = React.useState<boolean>(false);
  const toggleDrawer = (): void => {
    setOpenDrawer((previousState) => !previousState);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="static" component="nav">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              {/* Hamburger menu icon */}
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={toggleDrawer}
                  sx={{ mr: 2, display: { sm: "none" } }}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
              {/* Navigation bar links */}
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                {navigationItems.map((item) => (
                  <Button
                    key={item.text}
                    sx={{ color: "#fff" }}
                    component={NavLink}
                    to={item.link}
                  >
                    {item.text}
                  </Button>
                ))}
              </Box>
              {/*
                TODO: Add the logo of the app.
              */}
              <NavigationUserMenu settings={settings} />
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
      {/* Actual hamburger menu */}
      <NavigationDrawer
        container={container}
        toggleDrawer={toggleDrawer}
        drawerIsOpen={openDrawer}
        navigationItems={navigationItems}
        drawerTitle={"KendoApp"}
      />
      <Outlet />
    </>
  );
};

export default NavigationBar;

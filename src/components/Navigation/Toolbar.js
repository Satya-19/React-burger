import React from "react";

import classes from "./Toolbar.css";
import Logo from "../../containers/Layout/Logo";
import NavigationItems from "./NavItems";
import DrawerToggle from "./DrawerToggle";

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <DrawerToggle clicked={props.opened} />
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems isAuthenticated={props.isAuth} />
    </nav>
  </header>
);

export default toolbar;

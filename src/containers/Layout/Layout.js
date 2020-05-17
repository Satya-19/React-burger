import React, { Fragment, Component } from "react";
import { connect } from "react-redux";

import Toolbar from "../../components/Navigation/Toolbar";
import classes from "./Layout.css";
import SideDrawer from "../../components/Navigation/SideDrawer";

class Layout extends Component {
  state = {
    sideDrawer: false,
  };

  sideDrawerOpen = () => {
    this.setState({ sideDrawer: true });
  };

  sideDrawerClosed = () => {
    this.setState({ sideDrawer: false });
  };

  render() {
    return (
      <Fragment>
        <Toolbar
          isAuth={this.props.isAuthenticated}
          opened={this.sideDrawerOpen}
        />
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          open={this.state.sideDrawer}
          closed={this.sideDrawerClosed}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);

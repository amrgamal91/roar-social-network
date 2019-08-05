//done
import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CustomButton from "../../util/CustomButton";
import PostRoar from "../roar/PostRoar";
import logo from "../../images/brandLogo.png";

// MUI stuff
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";

// Icons
import Notifications from "./Notifications";

const styles = {
  root: {
    flexGrow: 1
  },
  logo: {
    marginRight: 15,
    marginTop: 15
  },
  title: {
    fontFamily: "'Courgette', cursive",
    display: "flex",
    justifyContent: "flex-start",
    color: "#fff",
    fontWeight: "Bold",
    fontSize: "2.8rem"
  }
};

class Navbar extends Component {
  render() {
    const { classes, authenticated } = this.props;

    return (
      <AppBar>
        <Toolbar>
          <div class="brand">
            <Link to="/">
              <Avatar alt="logo" src={logo} className={classes.logo} />
            </Link>

            <Link to="/">
              <Typography className={classes.title}>RoOoar</Typography>
            </Link>
          </div>
          <div className="nav-container">
            {authenticated ? (
              <Fragment>
                <PostRoar />

                <Notifications />
              </Fragment>
            ) : (
              <Fragment>
                <Button color="inherit" component={Link} to="/login">
                  Login
                </Button>
                {/* <Button color="inherit" component={Link} to="/">
                  Home
                </Button> */}
                <Button color="inherit" component={Link} to="/signup">
                  Signup
                </Button>
              </Fragment>
            )}
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(withStyles(styles)(Navbar));

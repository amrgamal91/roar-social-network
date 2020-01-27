//done
import React, { Component } from "react";
import PropTypes from "prop-types";
import AppIcon from "../images/brandLogo.png";
import { Link } from "react-router-dom";
//MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";

//Redux stuff
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";
import { handleSocialUser } from "../redux/actions/userActions";

import firebase from "firebase/app";
import "firebase/app";
import "firebase/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import apiConfig from "../util/apiConfig";

if(!firebase.apps.length){
firebase.initializeApp({
  apiKey: apiConfig.apiKey,
  authDomain: apiConfig.authDomain,
  messagingSenderId: apiConfig.messagingSenderId
});}

const styles = theme => ({
  ...theme.login
});

class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: (credential, redirectUrl) => {
        let history = this.props.history;
        // console.log(
        //   "credentials : " + JSON.stringify(credential.user.displayName)
        // );
        // console.log("user data: " + JSON.stringify(credential.user));

        credential.user.getIdToken().then(token => {
          // console.log("credentials: " + JSON.stringify(credential));
          // make api call to backend
          const newUserData = {
            email: credential.user.email,
            handle: credential.user.displayName,
            uid: credential.user.uid,
            token: token,
            imageUrl: credential.user.photoURL
          };

          this.props.handleSocialUser(newUserData, history);
        });
      }
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData, this.props.history);
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const {
      classes,
      UI: { loading }
    } = this.props;

    const { errors } = this.state;

    return (
      <Grid container justify="center">
        <Paper className={classes.paper}>
          <Grid item sm className={classes.form}>
            <img src={AppIcon} alt="lion" className={classes.image} />
            <Typography variant="h2" className={classes.pageTitle}>
              Login
            </Typography>
            <form noValidate onSubmit={this.handleSubmit}>
              <TextField
                id="email "
                name="email"
                type="email"
                label="Email"
                className={classes.textField}
                helperText={errors.email}
                error={errors.email ? true : false}
                value={this.state.email}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                id="password "
                name="password"
                type="password"
                label="Password"
                className={classes.textField}
                helperText={errors.password}
                error={errors.password ? true : false}
                value={this.state.password}
                onChange={this.handleChange}
                fullWidth
              />
              {errors.general && (
                <Typography variant="body2" className={classes.customError}>
                  {errors.general}
                </Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.Button}
                disabled={loading}
              >
                Login
                {loading && (
                  <CircularProgress size={30} className={classes.progress} />
                )}
              </Button>
              <br />
              <small>
                dont have an account ? sign up <Link to="/signup">here</Link>{" "}
              </small>
            </form>
          </Grid>
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </Paper>
      </Grid>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired, // from mapActionsToProps
  user: PropTypes.object.isRequired, //from mapStateToProps
  UI: PropTypes.object.isRequired //from mapStateToProps
};

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
});

const mapActionsToProps = {
  loginUser,
  handleSocialUser
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(login));

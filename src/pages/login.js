//done
import React, { Component } from "react";
import PropTypes from "prop-types";
import AppIcon from "../images/lion.ico";
import { Link } from "react-router-dom";
import NatureBg from "../images/nature-bg.jpg";
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

const imagePath = "../images/nature-bg.jpg";
const styles = {
  // body: {
  //   backgroundColor: "red",
  //   backgroundImage: `url(${imagePath})`
  // },
  paper: {
    padding: 20,
    borderRadius: 10
  },
  form: {
    margin: "0 auto",
    textAlign: "center"
  },
  image: {
    margin: "20px auto 20px auto"
  },
  pageTitle: {
    margin: "10px auto 10px auto",
    color: "#00bcd4"
  },
  textField: {
    margin: "10px auto 10px auto"
  },
  button: {
    marginTop: 20,
    position: "relative" // because of progress
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: "10"
  },
  progress: {
    position: "absolute"
  }
};

class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

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
      <Grid container className={classes.form} sm={5} xs={12}>
        <Paper className={classes.paper}>
          <Grid item sm />
          <Grid item sm>
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
          <Grid item sm />
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
  loginUser
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(login));

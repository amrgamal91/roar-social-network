//done
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import ProfileSkeleton from "../../util/ProfileSkeleton";
import EditDetails from "./EditDetails";

//MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

//Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import EditIcon from "@material-ui/icons/Edit";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";
import InfoRounded from "@material-ui/icons/InfoRounded";

//Redux
import { connect } from "react-redux";
import { logoutUser, uploadImage } from "../../redux/actions/userActions";
import CustomButton from "../../util/CustomButton";
import AuthRoute from "../../util/AuthRoute";

const styles = {
  invisibleSeparator: {
    border: "none",
    margin: 4
  },
  visibleColoredSeparator: {
    width: "100%",
    borderBottom: "1px solid rgba(128,128,128,0.5)",
    marginBottom: 5,
    marginTop: 10
  },
  typography: {
    useNextVariants: true
  },
  image: {
    margin: "20px auto 20px auto"
  },
  button: {
    marginTop: 20,
    position: "relative"
  },
  paper: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%"
      }
    },
    "& .profile-image": {
      width: 200,
      height: 200,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%"
    },
    "& .profile-details": {
      "& span, svg": {
        verticalAlign: "middle"
      },
      "& a": {
        color: "#008394"
      }
    },

    "& .userName": {
      display: "block",
      textAlign: "center",
      marginLeft: " auto",
      marignRight: "auto"
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer"
      }
    }
  },

  labels: {
    color: "#00bcd4",
    marginRight: 6
  },
  userDetailsIcons: {
    color: "#00bcd4",
    marginRight: 7
  },
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px"
    }
  }
};

class Profile extends Component {
  /** handles image upload input */
  handleImageChange = event => {
    const image = event.target.files[0];
    //send to server
    const formData = new FormData();
    formData.append("image", image, image.name);
    this.props.uploadImage(formData);
  };

  /**handle editing the profile picture  */
  handleEditPricture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  /**logout handle */
  handleLogout = () => {
    this.props.logoutUser();
  };

  render() {
    const {
      classes,
      user: {
        credentials: { handle, createdAt, imageUrl, bio, website, location },
        loading,
        authenticated
      }
    } = this.props;

    let profileMarkup = !loading ? (
      authenticated ? (
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className="image-wrapper">
              <img src={imageUrl} alt="profile" className="profile-image" />
              <input
                type="file"
                id="imageInput"
                hidden="hidden"
                onChange={this.handleImageChange}
              />
              <CustomButton
                tip="Edit profile pricture"
                onClick={this.handleEditPricture}
                btnClassName="button"
              >
                <EditIcon color="primary" />
              </CustomButton>
            </div>

            <div className="profile-details">
              <MuiLink
                className="userName"
                component={Link}
                to={`/user/${handle}`}
                variant="h4"
              >
                {handle}
              </MuiLink>
              <hr className={classes.visibleColoredSeparator} />
              <hr className={classes.invisibleSeparator} />
              {bio && (
                <Fragment>
                  <div style={{ display: "inline-flex" }}>
                    <InfoRounded className={classes.userDetailsIcons} />
                    <Typography variant="body2">{bio}</Typography>
                  </div>
                </Fragment>
              )}
              <hr className={classes.invisibleSeparator} />
              {location && (
                <Fragment>
                  <div style={{ display: "inline-flex" }}>
                    <LocationOn className={classes.userDetailsIcons} />
                    <Typography variant="body2" className={classes.labels}>
                      From
                    </Typography>
                    <Typography variant="body2">{" " + location}</Typography>
                  </div>
                </Fragment>
              )}
              <hr className={classes.invisibleSeparator} />
              {website && (
                <Fragment>
                  <div style={{ display: "inline-flex" }}>
                    <LinkIcon className={classes.userDetailsIcons} />
                    <Typography variant="body2" className={classes.labels}>
                      WebPage
                    </Typography>
                    <Typography variant="body2">
                      {" "}
                      <a
                        href={website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {" "}
                        {website}
                      </a>
                    </Typography>
                  </div>
                </Fragment>
              )}
              <hr className={classes.invisibleSeparator} />
              <div style={{ display: "inline-flex" }}>
                <CalendarToday className={classes.userDetailsIcons} /> {""}
                <Typography variant="body2" className={classes.labels}>
                  Member since
                </Typography>
                <Typography variant="body2">
                  {dayjs(createdAt).format("MMM YYYY")}
                </Typography>
              </div>
            </div>

            <hr className={classes.visibleColoredSeparator} />

            <CustomButton tip="Logout" onClick={this.handleLogout}>
              <KeyboardReturn color="primary" />
            </CustomButton>
            <EditDetails />
          </div>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <Typography variant="body2" align="center">
            No Profile found , Please login
          </Typography>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/login"
            >
              Login
            </Button>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/signup"
            >
              Signup
            </Button>
          </div>
        </Paper>
      )
    ) : (
      <ProfileSkeleton />
    );
    return profileMarkup;
  }
}

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  uploadImage: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = { logoutUser, uploadImage };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Profile));

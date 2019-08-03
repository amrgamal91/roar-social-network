//done
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import MuiLink from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

// Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import InfoRounded from "@material-ui/icons/InfoRounded";

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

const StaticProfile = props => {
  const {
    classes,
    profile: { handle, createdAt, imageUrl, bio, website, location }
  } = props;

  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={imageUrl} alt="profile" className="profile-image" />
        </div>

        <div className="profile-details">
          <MuiLink
            className="userName"
            component={Link}
            to={`/user/${handle}`}
            // to={"/user/" + this.props.profile.handle}
            variant="h4"
          >
            {handle}
          </MuiLink>
          <hr className={classes.visibleColoredSeparator} />
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
                  <a href={website} target="_blank" rel="noopener noreferrer">
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
      </div>
    </Paper>
  );
};

StaticProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(StaticProfile);

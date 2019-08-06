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

const styles = theme => ({
  ...theme.staticProfile
});

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

//done
import React, { Component } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import LikeButton from "./LikeButton";
//MUI Styff
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import ChatIcon from "@material-ui/icons/Chat";
//Redux
import { connect } from "react-redux";
import { likeRoar, unlikeRoar } from "../../redux/actions/dataAction";
import PropTypes from "prop-types";

import CustomButton from "../../util/CustomButton";
import DeleteRoar from "./DeleteRoar";
import RoarDialog from "./RoarDialog";

const styles = theme => ({
  ...theme.roar
});

class Roar extends Component {
  /** */
  likedRoar = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(like => like.roarId === this.props.roar.roarId)
    )
      return true;
    else return false;
  };

  render() {
    dayjs.extend(relativeTime);

    const {
      classes,
      roar: {
        body,
        createdAt,
        userImage,
        userHandle,
        roarId,
        likeCount,
        commentCount
      },
      user: {
        authenticated,
        credentials: { handle }
      }
    } = this.props;

    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeleteRoar roarId={roarId} />
      ) : null;

    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title="Profile Image"
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography
            className={classes.userhandle}
            variant="h5"
            component={Link}
            to={`/user/${userHandle}`}
            color="primary"
          >
            {userHandle}
          </Typography>

          {deleteButton}

          <Typography variant="body2" color="secondary">
            {dayjs(createdAt).fromNow()}
          </Typography>

          <Typography variant="body1">{body}</Typography>
          <div className={classes.roarbuttons}>
            <LikeButton roarId={roarId} />
            <span>
              {likeCount} {likeCount === 1 ? "Like" : "Likes"}
            </span>

            <CustomButton tip="Comments">
              <ChatIcon color="primary" />
            </CustomButton>
            <span>
              {commentCount} {commentCount === 1 ? "Comment" : "Comments"}
            </span>
          </div>
          <RoarDialog
            roarId={roarId}
            userHandle={userHandle}
            openDialog={this.props.openDialog}
          />
        </CardContent>
      </Card>
    );
  }
}

Roar.propTypes = {
  user: PropTypes.object.isRequired,
  roar: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
};

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = {
  likeRoar,
  unlikeRoar
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Roar));

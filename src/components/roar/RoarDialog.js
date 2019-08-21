//review
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import CustomButton from "../../util/CustomButton";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import LikeButton from "./LikeButton";
import Comments from "./Comments";
import CommentForm from "./CommentForm";

// MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// Icons
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import ChatIcon from "@material-ui/icons/Chat";

// Redux stuff
import { connect } from "react-redux";
import { getRoar, clearErrors } from "../../redux/actions/dataAction";

const styles = theme => ({
  ...theme.roarDialog
});

class RoarDialog extends Component {
  state = {
    open: false,
    oldPath: "",
    newPath: ""
  };
  componentDidMount() {
    if (this.props.openDialog) {
      this.handleOpen();
    }
  }

  /**
   * when the user opens the dialog , change the link to ID of the roar
   * when close the dialog , return back to the original link , remove Id of the roarID
   */
  handleOpen = () => {
    let oldPath = window.location.pathname;

    const { userHandle, roarId } = this.props;
    const newPath = `/user/${userHandle}/roar/${roarId}`;

    if (oldPath === newPath) oldPath = `/user/${userHandle}`;

    window.history.pushState(null, null, newPath);

    this.setState({ open: true, oldPath, newPath });
    this.props.getRoar(this.props.roarId);
  };

  handleClose = () => {
    window.history.pushState(this.state, null, this.state.oldPath);
    this.setState({ open: false });

    this.props.clearErrors();
    this.forceUpdate();
  };

  render() {
    const {
      classes,
      roar: {
        roarId,
        body,
        createdAt,
        likeCount,
        commentCount,
        userImage,
        userHandle,
        comments
      },
      UI: { loading }
    } = this.props;

    //dialogMarkup : render loading spinner or content
    const dialogMarkup = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={200} thickness={2} />
      </div>
    ) : (
      <Grid container spacing={2}>
        <Grid item sm={4}>
          <img src={userImage} alt="Profile" className={classes.profileImage} />
        </Grid>
        <Grid item sm={8}>
          <Typography
            className={classes.userHandle}
            component={Link}
            color="primary"
            variant="h5"
            to={`/user/${userHandle}`}
          >
            {userHandle}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body1">{body}</Typography>
          <div className={classes.roarbuttons}>
            <LikeButton roarId={roarId} />
            <span>{likeCount} likes</span>
            <CustomButton tip="comments">
              <ChatIcon color="primary" />
            </CustomButton>
            <span>{commentCount} comments</span>
          </div>
        </Grid>
        <hr className={classes.visibleSeparator} />
        <CommentForm roarId={roarId} />
        <Comments comments={comments} />
      </Grid>
    );

    return (
      <Fragment>
        <CustomButton
          onClick={this.handleOpen}
          tip="Expand roar"
          tipClassName={classes.expandButton}
        >
          <UnfoldMore color="primary" />
        </CustomButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <CustomButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </CustomButton>
          <DialogContent className={classes.dialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

RoarDialog.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  getRoar: PropTypes.func.isRequired,
  roarId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  roar: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  roar: state.data.roar,
  UI: state.UI
});

const mapActionsToProps = {
  getRoar,
  clearErrors
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(RoarDialog));

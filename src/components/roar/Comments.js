//done
import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  ...theme.comments
});
/**
 * here in map
 * index param : The index of the current element being processed in the array
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
 * */
class Comments extends Component {
  render() {
    const { comments, classes } = this.props;
    return (
      <Grid container>
        {comments && comments.length > 0
          ? comments.map((comment, index) => {
              const { body, createdAt, userImage, userHandle } = comment;
              return (
                <Fragment key={createdAt}>
                  <Grid item sm={12} className={classes.commentBlock}>
                    <Grid container>
                      <Grid item sm={2} xs={3}>
                        <img
                          src={userImage}
                          alt="comment"
                          className={classes.commentImage}
                        />
                      </Grid>
                      <Grid item sm={10} xs={9}>
                        <div className={classes.commentData}>
                          <Typography
                            className={classes.userHandle}
                            variant="h5"
                            component={Link}
                            to={`/user/${userHandle}`}
                            color="primary"
                          >
                            {userHandle}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
                          </Typography>
                          <hr className={classes.invisibleSeparator} />
                          <Typography variabnt="body1">{body}</Typography>
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* {index !== comments.length - 1 && (
                    <hr className={classes.invisibleSeparator} />
                  )} */}
                </Fragment>
              );
            })
          : null}
      </Grid>
    );
  }
}

// Comments.propTypes = {
//   comments: PropTypes.array.isRequired
// };

export default withStyles(styles)(Comments);

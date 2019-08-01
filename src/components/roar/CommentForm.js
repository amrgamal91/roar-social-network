//done
import React, { Component } from "react";
import PropTypes from "prop-types";

// MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

// Redux stuff
import { connect } from "react-redux";
import { submitComment } from "../../redux/actions/dataAction";

const styles = {};

class CommentForm extends Component {
  state = {
    body: "",
    errors: {}
  };

  /**
   * componentWillReceiveProps() is invoked before a mounted component receives new props.
   * If you need to update the state in response to prop changes (for example, to reset it),
   * you may compare this.props and nextProps and perform state transitions using
   * this.setState() in this method.
   * React doesn't call componentWillReceiveProps with initial props during mounting.
   * It only calls this method if some of component's props may update.
   * used here to clear the body if there is no errors and not loading UI
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: "" });
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.submitComment(this.props.roarId, { body: this.state.body });
  };

  render() {
    const { classes, authenticated } = this.props;
    const errors = this.state.errors;

    const commentFormMarkup = authenticated ? (
      <Grid item sm={12}>
        <form onSubmit={this.handleSubmit}>
          <Grid container>
            <Grid item sm={10}>
              <TextField
                name="body"
                type="text"
                label="Comment on the roar"
                error={errors.comment ? true : false}
                helperText={errors.comment}
                value={this.state.body}
                onChange={this.handleChange}
                fullWidth
                className={classes.textField}
              />
            </Grid>
            <Grid item sm={2}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    ) : null;
    return commentFormMarkup;
  }
}

CommentForm.propTypes = {
  submitComment: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  roarId: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  UI: state.UI,
  authenticated: state.user.authenticated
});

export default connect(
  mapStateToProps,
  { submitComment }
)(withStyles(styles)(CommentForm));

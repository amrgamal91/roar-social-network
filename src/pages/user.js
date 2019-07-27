import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Scream from "../components/scream/Scream";
import Grid from "@material-ui/core/Grid";
import StaticProfile from "../components/profile/StaticProfile";
import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataAction";

class user extends Component {
  state = {
    profile: null,
    screamIdParam: null
  };

  componentDidMount() {
    console.log("beginning of Component did mount ....!!!");
    const handle = this.props.match.params.handle;
    console.log("handle is : " + handle);
    console.log("params is : " + this.props.match.params);
    console.log("props is : " + this.props);

    const screamId = this.props.match.params.screamId;

    if (screamId) this.setState({ screamIdParam: screamId });

    this.props.getUserData(handle);
    axios
      .get(
        `https://us-central1-socialapp-dfb2e.cloudfunctions.net/api/user/${handle}`
      )
      .then(res => {
        this.setState({
          profile: res.data.user
        });
        console.log("the handle : " + handle);

        console.log("the profile data : " + res.data.user.bio);
      })
      .catch(err =>
        console.log("here is the error from the getuserdata: " + err)
      );
  }

  render() {
    const { screams, loading } = this.props.data;
    const screamsMarkup = loading ? (
      <p>Loading data ...</p>
    ) : screams === null ? (
      <p>No Screams from this user</p>
    ) : (
      screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
    );
    return (
      <Grid container spacing={8}>
        <Grid item sm={8} xs={12}>
          {screamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {/* <StaticProfile profile={this.state.profile} /> */}
        </Grid>
      </Grid>
      // <div>here is the user component</div>
    );
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getUserData }
)(user);

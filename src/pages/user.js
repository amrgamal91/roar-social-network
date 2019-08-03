//done
import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import Grid from "@material-ui/core/Grid";
import StaticProfile from "../components/profile/StaticProfile";
import Roar from "../components/roar/Roar";
import RoarSkeleton from "../util/RoarSkeleton";
import ProfileSkeleton from "../util/ProfileSkeleton";

//Redux
import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataAction";

class user extends Component {
  state = {
    profile: null,
    roarIdParam: null
  };

  componentDidMount() {
    // console.log("beginning of Component did mount ....!!!");
    const handle = this.props.match.params.handle;
    // console.log("handle is : " + handle);
    // console.log("params are : " + this.props.match.params);
    // console.log("props are : " + this.props);

    const roarId = this.props.match.params.roarId;

    if (roarId) this.setState({ roarIdParam: roarId });

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
    const { roars, loading } = this.props.data;
    const roarsMarkup = loading ? (
      <RoarSkeleton />
    ) : roars === null ? (
      <p>No Roars from this user</p>
    ) : (
      roars.map(roar => <Roar key={roar.roarId} roar={roar} />)
    );
    return (
      <Grid container spacing={8}>
        <Grid item sm={8} xs={12}>
          {roarsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
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

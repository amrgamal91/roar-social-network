import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Roar from "../components/roar/Roar";
import Profile from "../components/profile/Profile";
import { connect } from "react-redux";
import { getRoars } from "../redux/actions/dataAction";
import PropTypes from "prop-types";
import RoarSkeleton from "../util/RoarSkeleton";

export class home extends Component {
  componentDidMount() {
    this.props.getRoars();
  }
  render() {
    const { roars, loading } = this.props.data;
    let recentRoarsMarkup = !loading ? (
      roars.map(roar => <Roar key={roar.roarId} roar={roar} />)
    ) : (
      <RoarSkeleton />
    );
    return (
      <Grid container spacing={8}>
        <Grid item sm={8} xs={12}>
          {recentRoarsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getRoars: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getRoars }
)(home);

//done
import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Roar from "../components/roar/Roar";
import Profile from "../components/profile/Profile";
import { connect } from "react-redux";
import { getRoars } from "../redux/actions/dataAction";
import PropTypes from "prop-types";
import RoarSkeleton from "../util/RoarSkeleton";
import ChatBox from '../components/chat/ChatBox';
import Paper from "@material-ui/core/Paper";
import { askForPermissioToReceiveNotifications } from '../push-notification';
import Button from "@material-ui/core/Button";

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
      <Grid container spacing={8} className="home">
        <Grid item sm={8} xs={12} className="roarSection">
          {recentRoarsMarkup}
        </Grid>
        <Grid item sm={4} xs={12} className="profileSection">
          <Profile />
          <Paper >
            <ChatBox/>
          </Paper>
          
          <Paper >
            < Button onClick={askForPermissioToReceiveNotifications} >
              Click here to receive notifications
            </Button>
          </Paper>
        
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

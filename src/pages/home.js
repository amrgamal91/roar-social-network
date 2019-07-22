import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Scream from "../components/Scream";
import Profile from "../components/Profile";

export class home extends Component {
  state = {
    screams: null
  };
  componentDidMount() {
    // axios.get();
    axios
      .get("https://us-central1-socialapp-dfb2e.cloudfunctions.net/api/screams")
      .then(res => {
        console.log(res.data);
        this.setState({
          screams: res.data
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    let recentScreamsMarkup = this.state.screams ? (
      this.state.screams.map(scream => (
        // <p key={scream.screamId}>{scream.body}</p>
        <Scream key={scream.screamId} scream={scream} />
      ))
    ) : (
      <p>Loading...</p>
    );
    return (
      <Grid container spacing={8}>
        <Grid item sm={8} xs={12}>
          {recentScreamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

export default home;

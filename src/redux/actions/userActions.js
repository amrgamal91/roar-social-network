import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  LOADING_USER
} from "../types";
import axios from "axios";

export const loginUser = (userData, history) => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post(
      "https://us-central1-socialapp-dfb2e.cloudfunctions.net/api/login",
      userData
    )
    .then(res => {
      //   consoel.log(res.data);
      //   this.setState({ loading: false });
      const FBIdToken = `Bearer ${res.data.idtoken}`;
      console.log(`here is the data from login ${res.data.idtoken}`);
      localStorage.setItem("FireBaseIdToken", FBIdToken);
      axios.defaults.headers.common["Authorization"] = FBIdToken;
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const getUserData = () => dispatch => {
  dispatch({ type: LOADING_USER });
  axios
    .get("https://us-central1-socialapp-dfb2e.cloudfunctions.net/api/user")
    .then(res => {
      dispatch({
        type: SET_USER,
        payload: res.data // payload is some data sent to reducer
      });
    })
    .catch(err => console.log("Error while getting user data ! : " + err));
};

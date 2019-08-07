//done
import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  LOADING_USER,
  SET_UNAUTHENTICATED,
  MARK_NOTIFICATIONS_READ
} from "../types";
import axios from "axios";

/**
 * call login user api , then
 * set set authorization header value to the received token ,then
 * get the user data ,
 */
export const loginUser = (userData, history) => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post(
      "https://us-central1-socialapp-dfb2e.cloudfunctions.net/api/login",
      userData
    )
    .then(res => {
      setAuthorizationHeader(res.data.idtoken);
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

/**
 * 1- removes the authorization token
 * 2- removes the authorization header from request headers
 * 3- back to initial state in Redux user reducer
 */
export const logoutUser = () => dispatch => {
  localStorage.removeItem("FBIdToken");
  localStorage.removeItem("FireBaseIdToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
};

/**
 * get the userdata from server and then ,
 * update the current state with the new data
 */
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

/**
 * call signup user api , then
 * set set authorization header value to the received token ,then
 * get the user data ,
 */
export const signupUser = (newUserData, history) => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post(
      "https://us-central1-socialapp-dfb2e.cloudfunctions.net/api/signup",
      newUserData
    )
    .then(res => {
      // console.log("signUp data : " + JSON.stringify(res));
      setAuthorizationHeader(res.data.token);
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

export const handleSocialUser = (newUserData, history) => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post(
      "https://us-central1-socialapp-dfb2e.cloudfunctions.net/api/handleSocialUser",
      newUserData
    )
    .then(res => {
      // console.log("signUp data : " + JSON.stringify(res));
      setAuthorizationHeader(newUserData.token);
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

/**
 * upload images changes in userData (imageUrl) so
 * after uploading the image file , it should back with user new data
 * that contains the new ImageUrl (updating the state)
 */
export const uploadImage = formData => dispatch => {
  dispatch({ type: LOADING_USER });
  axios
    .post(
      "https://us-central1-socialapp-dfb2e.cloudfunctions.net/api/user/image",
      formData
    )
    .then(res => {
      dispatch(getUserData());
    })
    .catch(err => console.log(err));
};

/**
 * updates the user details with the new values
 * get the updated userdetails in the response
 */
export const editUserDetails = userDetails => dispatch => {
  dispatch({ type: LOADING_USER });
  axios
    .post(
      "https://us-central1-socialapp-dfb2e.cloudfunctions.net/api/user",
      userDetails
    )
    .then(() => {
      dispatch(getUserData());
    })
    .catch(err => console.log(err));
};

/**
 * set the read flag of notifications to true
 */
export const markNotificationsRead = notificationIds => dispatch => {
  axios
    .post(
      "https://us-central1-socialapp-dfb2e.cloudfunctions.net/api/notifications",
      notificationIds
    )
    .then(res => {
      dispatch({
        type: MARK_NOTIFICATIONS_READ
      });
    })
    .catch(err => console.log(err));
};

/**
 * create token variable in browser localStorage,then
 * set the authorization header value in request (Token)
 */
export const setAuthorizationHeader = token => {
  const FBIdToken = `Bearer ${token}`;
  // console.log(`here is the Token value : ${token}`);
  localStorage.setItem("FireBaseIdToken", FBIdToken);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};

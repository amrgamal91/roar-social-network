/**
 * https://redux.js.org/basics/actions
 * example :
 * export method =()=>dispatch=>{}  //this is called bound action creator
 * which calls the method and then dispatch to redux store
 * dispatch takes an action which consists of type &  payload
 * dispatch (payload) : is the only source of information to redux store
 */

import {
  SET_ROARS,
  LOADING_DATA,
  LIKE_ROAR,
  UNLIKE_ROAR,
  DELETE_ROAR,
  SET_ERRORS,
  POST_ROAR,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_ROAR,
  STOP_LOADING_UI,
  SUBMIT_COMMENT
} from "../types";

import axios from "axios";

/**
 * getting all roars from database
 */
export const getRoars = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("https://us-central1-socialapp-dfb2e.cloudfunctions.net/api/roars")
    .then(res => {
      dispatch({
        type: SET_ROARS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: SET_ROARS,
        payload: []
      });
    });
};

/**
 * Like Roar
 */
export const likeRoar = roarId => dispatch => {
  axios
    .get(
      `https://us-central1-socialapp-dfb2e.cloudfunctions.net/api/roar/${roarId}/like`
    )
    .then(res => {
      dispatch({
        type: LIKE_ROAR,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

/**
 *  Unlike a roar
 * */
export const unlikeRoar = roarId => dispatch => {
  axios
    .get(
      `https://us-central1-socialapp-dfb2e.cloudfunctions.net/api/roar/${roarId}/unlike`
    )
    .then(res => {
      dispatch({
        type: UNLIKE_ROAR,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

/**
 * Submit a comment
 */
export const submitComment = (roarId, commentData) => dispatch => {
  axios
    .post(
      `https://us-central1-socialapp-dfb2e.cloudfunctions.net/api/roar/${roarId}/comment`,
      commentData
    )
    .then(res => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

/**
 * delete a roar
 */
export const deleteRoar = roarId => dispatch => {
  axios
    .delete(
      `https://us-central1-socialapp-dfb2e.cloudfunctions.net/api/roar/${roarId}`
    )
    .then(() => {
      console.log("here is the delete id : " + roarId);
      dispatch({ type: DELETE_ROAR, payload: roarId });
    })
    .catch(err => {
      console.log(err);
      console.log("here is the delete error : " + err);
    });
};

export const getRoar = roarId => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .get(
      `https://us-central1-socialapp-dfb2e.cloudfunctions.net/api/roar/${roarId}`
    )
    .then(res => {
      dispatch({
        type: SET_ROAR,
        payload: res.data
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch(err => console.log(err));
};

/**
 * Post a roar
 */
export const postRoar = newRoar => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post(
      "https://us-central1-socialapp-dfb2e.cloudfunctions.net/api/roar",
      newRoar
    )
    .then(res => {
      dispatch({
        type: POST_ROAR,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

/**
 * get Roars of a particular user
 */
export const getUserData = userHandle => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(
      `https://us-central1-socialapp-dfb2e.cloudfunctions.net/api/user/${userHandle}`
    )
    .then(res => {
      dispatch({
        type: SET_ROARS,
        payload: res.data.roars
      });
    })
    .catch(() => {
      dispatch({
        type: SET_ROARS,
        payload: null
      });
    });
};

export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};

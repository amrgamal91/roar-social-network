import {
  SET_ROARS,
  LIKE_ROAR,
  UNLIKE_ROAR,
  LOADING_DATA,
  DELETE_ROAR,
  POST_ROAR,
  SET_ROAR,
  SUBMIT_COMMENT
} from "../types";

const initialState = {
  roars: [],
  roar: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_ROARS:
      return {
        ...state,
        roars: action.payload,
        loading: false
      };
    case SET_ROAR:
      return {
        ...state,
        roar: action.payload
      };
    case LIKE_ROAR:
    case UNLIKE_ROAR:
      let index = state.roars.findIndex(
        roar => roar.roarId === action.payload.roarId
      );
      state.roars[index] = action.payload;
      if (state.roar.roarId === action.payload.roarId) {
        state.roar.likeCount = action.payload.likeCount; //bugfix: only update the likecount not the whole roar
      }
      return {
        ...state
        // likeCount: state.roar.likeCount + 1 //bugfix: update like counter in the roar dialog immediately
      };
    case DELETE_ROAR:
      let roarIndex = state.roars.findIndex(
        roar => roar.roarId === action.payload
      );
      state.roars.splice(roarIndex, 1);
      return { ...state };
    case POST_ROAR:
      return { ...state, roars: [action.payload, ...state.roars] };
    case SUBMIT_COMMENT:
      return {
        ...state,
        roar: {
          ...state.roar,
          commentCount: state.roar.commentCount + 1, //bugfix: update like counter in the roar dialog immediately
          comments: [action.payload, ...state.roar.comments]
        }
      };

    default:
      return state;
  }
}

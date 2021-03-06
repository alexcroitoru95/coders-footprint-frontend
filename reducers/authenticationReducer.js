import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
  GOOGLE_LOGIN_SUCCESS,
  GOOGLE_LOGIN_FAIL,
  CLEAR_TOKENS
} from '../actions/authenticationTypes';

const INITIAL_STATE = {
  token: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FACEBOOK_LOGIN_SUCCESS:
      return { ...state, token: action.payload };
    case FACEBOOK_LOGIN_FAIL:
      return { ...state, token: null };
    case GOOGLE_LOGIN_SUCCESS:
      return { ...state, token: action.payload };
    case GOOGLE_LOGIN_FAIL:
      return { ...state, token: null };
    case CLEAR_TOKENS:
      return { ...state, token: null };
    default:
      return state;
  }
};

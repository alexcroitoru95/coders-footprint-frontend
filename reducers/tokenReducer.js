import { STORE_BEARER_TOKEN } from '../actions/authenticationTypes';

const INITIAL_STATE = {
  bearer_token: '',
  bearer_token_expiration_date: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case STORE_BEARER_TOKEN:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};

import { STORE_USER, CLEAR_USER } from '../actions/authenticationTypes';

const INITIAL_STATE = {
  email: '',
  firstName: '',
  lastName: '',
  picture: '',
  stackOverflowDisplayName: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case STORE_USER:
      return Object.assign({}, state, action.payload);
    case CLEAR_USER:
      return INITIAL_STATE;
    default:
      return state;
  }
};

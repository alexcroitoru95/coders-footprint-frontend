import { EMAIL_SENT, DATA_DELETED, CLEAR_GDPR_REDUCER } from '../actions/authenticationTypes';

const INITIAL_STATE = {
  emailSent: false,
  dataDeleted: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_SENT:
      return Object.assign({}, state, action.payload);
    case DATA_DELETED:
      return Object.assign({}, state, action.payload);
    case CLEAR_GDPR_REDUCER:
      return INITIAL_STATE;
    default:
      return state;
  }
};

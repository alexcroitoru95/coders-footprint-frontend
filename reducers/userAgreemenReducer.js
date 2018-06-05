import {
  STACKOVERFLOW_DISPLAY_NAME_AGREEMENT,
  TERMS_AND_CONDITIONS_AGREEMENT,
  CLEAR_STACKOVERFLOW_DISPLAY_NAME_AGREEEMENT,
  CLEAR_TERMS_AND_CONDITIONS_AGREEMENT
} from '../actions/authenticationTypes';

const INITIAL_STATE = {
  stackOverflowDisplayNameAgreement: false,
  termsAndConditionsAgreement: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case STACKOVERFLOW_DISPLAY_NAME_AGREEMENT:
      return Object.assign({}, state, action.payload);
    case TERMS_AND_CONDITIONS_AGREEMENT:
      return Object.assign({}, state, action.payload);
    case CLEAR_STACKOVERFLOW_DISPLAY_NAME_AGREEEMENT:
      return INITIAL_STATE;
    case CLEAR_TERMS_AND_CONDITIONS_AGREEMENT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

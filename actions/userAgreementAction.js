import {
  STACKOVERFLOW_DISPLAY_NAME_AGREEMENT,
  TERMS_AND_CONDITIONS_AGREEMENT
} from './authenticationTypes';

const termsAndConditionsObject = {
  termsAndConditionsAgreement: false
};

const stackOverflowDisplayNameAgreementObject = {
  stackOverflowDisplayNameAgreement: false
};

export const userAgreementAction = action => dispatch => {
  switch (action) {
    case 'termsAndConditionsAgreed':
      termsAndConditionsObject.termsAndConditionsAgreement = true;
      dispatch({ type: TERMS_AND_CONDITIONS_AGREEMENT, payload: termsAndConditionsObject });

      break;
    case 'stackOverflowDisplayNameAgreed':
      stackOverflowDisplayNameAgreementObject.stackOverflowDisplayNameAgreement = true;
      dispatch({
        type: STACKOVERFLOW_DISPLAY_NAME_AGREEMENT,
        payload: stackOverflowDisplayNameAgreementObject
      });

      break;
    case 'termsAndConditionsDeclined':
      termsAndConditionsObject.termsAndConditionsAgreement = false;
      dispatch({ type: TERMS_AND_CONDITIONS_AGREEMENT, payload: termsAndConditionsObject });

      break;
    case 'stackOverflowDisplayNameDeclined':
      stackOverflowDisplayNameAgreementObject.stackOverflowDisplayNameAgreement = false;
      dispatch({
        type: STACKOVERFLOW_DISPLAY_NAME_AGREEMENT,
        payload: stackOverflowDisplayNameAgreementObject
      });

      break;
    default:
      break;
  }
};

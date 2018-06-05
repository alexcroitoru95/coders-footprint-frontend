import {
  CLEAR_USER,
  STORE_USER_EMAIL_INPUT,
  STORE_USER,
  CLEAR_ACCOUNTS
} from './authenticationTypes';

export * from './socialLoginUtils';
export * from './revokeAppPermissions';
export * from './emailInputChangeUtils';
export * from './retypeEmail';
export * from './stackDisplayNameInputUtils';
export * from './platformsAPI/checkPlatformsAction';
export * from './platformsAPI/sendEmailWithData';
export * from './platformsAPI/deleteUserData';
export * from './userAgreementAction';

export const storeEmailInput = emailInput => {
  return {
    type: STORE_USER_EMAIL_INPUT,
    payload: emailInput
  };
};

export const storeUser = user => {
  return {
    type: STORE_USER,
    payload: user
  };
};

export const clearUser = () => {
  return {
    type: CLEAR_USER
  };
};

export const clearAccount = () => {
  return {
    type: CLEAR_ACCOUNTS
  };
};

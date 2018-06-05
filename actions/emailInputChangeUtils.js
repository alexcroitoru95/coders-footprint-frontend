import { AsyncStorage } from 'react-native';
import { STORE_USER } from './authenticationTypes';

export const emailInputChange = emailInput => async dispatch => {
  if (emailInput.length > 0 && emailInput != undefined) {
    const emailInputObject = {
      email: emailInput
    };

    await AsyncStorage.setItem('email_token', emailInput);

    return dispatch({ type: STORE_USER, payload: emailInputObject });
  }
};

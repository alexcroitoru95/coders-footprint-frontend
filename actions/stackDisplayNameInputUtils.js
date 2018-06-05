import { STORE_USER } from './authenticationTypes';

export const stackDisplayNameInputChange = stackDisplayName => async dispatch => {
  if (stackDisplayName.length > 0 && stackDisplayName != undefined) {
    const stackDisplayNameInputObject = {
      stackOverflowDisplayName: stackDisplayName
    };

    return dispatch({ type: STORE_USER, payload: stackDisplayNameInputObject });
  }
};

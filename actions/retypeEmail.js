import { AsyncStorage } from 'react-native';
import { persistor } from '../store';
import { CLEAR_USER, CLEAR_TOKENS, CLEAR_ACCOUNTS } from './authenticationTypes';

export const retypeEmail = () => dispatch => {
  dispatch({ type: CLEAR_ACCOUNTS });
  dispatch({ type: CLEAR_USER });
  dispatch({ type: CLEAR_TOKENS });
  AsyncStorage.clear();
  persistor.purge();
};

import { combineReducers } from 'redux';
import auth from './authenticationReducer';
import user from './userReducer';
import accounts from './accountsReducer';
import bearerTokenReducer from './tokenReducer';
import gdprReducer from './gdprReducer';
import userAgreementReducer from './userAgreemenReducer';

export default combineReducers({
  auth,
  user,
  accounts,
  bearerTokenReducer,
  gdprReducer,
  userAgreementReducer
});

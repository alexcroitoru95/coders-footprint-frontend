import { Alert, AsyncStorage } from 'react-native';
import { persistor } from '../store';
import axios from 'axios';

import {
  FACEBOOK_REVOKE_PERMISSIONS,
  GOOGLE_REVOKE_PERMISSIONS,
  CLEAR_USER,
  CLEAR_TOKENS,
  CLEAR_ACCOUNTS
} from './authenticationTypes';

export const revokeAppPermissions = () => async dispatch => {
  let successFacebookRevoke = false;
  let successGoogleRevoke = false;

  const facebookToken = await AsyncStorage.getItem('fb_token');
  const googleToken = await AsyncStorage.getItem('google_token');
  const emailToken = await AsyncStorage.getItem('email_token');

  if (facebookToken) {
    await axios
      .delete('https://graph.facebook.com/me/permissions', {
        params: { access_token: facebookToken }
      })
      .then(function(response) {
        successFacebookRevoke = response.data.success;
      })
      .catch(error => {
        console.log(error);
        // Alert.alert('FB Graph API Error!', 'The error is ' + error, [
        //   { text: 'Ok', onPress: () => {} }
        // ]);
      });

    AsyncStorage.removeItem('fb_token');

    if (successFacebookRevoke == true) {
      dispatch({ type: FACEBOOK_REVOKE_PERMISSIONS, payload: successFacebookRevoke });

      Alert.alert(
        'Revoked Access',
        'You have revoked all permissions for this application. In order to use it again, you must login and grant access to the requested permissions. Thank you!',
        [{ text: 'Ok', onPress: () => {} }]
      );
    } else {
      Alert.alert(
        'Logout Failed!',
        'Failed to revoke your permissions for this app, please contact our support team! Thank you!',
        [{ text: 'Ok', onPress: () => {} }]
      );
    }
  }

  if (googleToken) {
    var headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    await axios
      .post('https://accounts.google.com/o/oauth2/revoke?token=' + googleToken, null, headers)
      .then(function(response) {
        if (response.status === 200) {
          successGoogleRevoke = true;
        }
      })
      .catch(error => {
        console.log(error);
        // Alert.alert('Google+ API Error!', 'The error is ' + error, [
        //   { text: 'Ok', onPress: () => {} }
        // ]);
      });

    AsyncStorage.removeItem('google_token');

    if (successGoogleRevoke == true) {
      dispatch({ type: GOOGLE_REVOKE_PERMISSIONS, payload: successGoogleRevoke });

      Alert.alert(
        'Revoked Access',
        'You have revoked all permissions for this application. In order to use it again, you must login and grant access to the requested permissions. Thank you!',
        [{ text: 'Ok', onPress: () => {} }]
      );
    } else {
      Alert.alert(
        'Logout Failed!',
        'Failed to revoke your permissions for this app, please contact our support team! Thank you!',
        [{ text: 'Ok', onPress: () => {} }]
      );
    }
  }

  if (emailToken) {
    AsyncStorage.removeItem('email_token');
  }

  dispatch({ type: CLEAR_ACCOUNTS });
  dispatch({ type: CLEAR_USER });
  dispatch({ type: CLEAR_TOKENS });
  AsyncStorage.clear();
  persistor.purge();
};

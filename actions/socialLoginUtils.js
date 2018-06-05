import { AsyncStorage } from 'react-native';
import { Facebook, Google } from 'expo';

import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
  GOOGLE_LOGIN_SUCCESS,
  GOOGLE_LOGIN_FAIL,
  STORE_USER
} from './authenticationTypes';

export const signInSocial = social => async dispatch => {
  switch (social) {
    case 'facebook':
      let facebookToken = await AsyncStorage.getItem('fb_token');

      if (facebookToken) {
        //Dispatch an action saying FB Login is done
        dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: facebookToken });
      } else {
        //Start up FB Login process
        doFacebookLogin(dispatch);
      }
      break;
    case 'google':
      let googleToken = await AsyncStorage.getItem('google_token');

      if (googleToken) {
        //Dispatch an action saying Google Login is done
        dispatch({ type: GOOGLE_LOGIN_SUCCESS, payload: googleToken });
      } else {
        //Start up Google Login process
        doGoogleLogin(dispatch);
      }
      break;
  }
};

const doFacebookLogin = async dispatch => {
  let { type, token } = await Facebook.logInWithReadPermissionsAsync('193857391247301', {
    permissions: ['public_profile', 'email']
  });

  if (type === 'success') {
    const response = await fetch(
      `https://graph.facebook.com/me/?fields=first_name,last_name,email,picture.width(300).height(300)&access_token=${token}`
    );

    const profile = await response.json();

    const userObject = {
      email: profile.email,
      firstName: profile.first_name,
      lastName: profile.last_name,
      picture: profile.picture.data.url
    };

    dispatch({ type: STORE_USER, payload: userObject });

    await AsyncStorage.setItem('fb_token', token);

    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
  }

  if (type === 'cancel') {
    return dispatch({ type: FACEBOOK_LOGIN_FAIL });
  }
};

const doGoogleLogin = async dispatch => {
  const { type, accessToken, user } = await Google.logInAsync({
    androidClientId: '128091534150-faadndff377bre7o8egef3mdklisfbnp.apps.googleusercontent.com',
    iosClientId: '128091534150-g28rn16n7tgeloju4goefa96a64vuj3j.apps.googleusercontent.com',
    scopes: ['profile', 'email']
  });

  if (type === 'success') {
    const userObject = {
      email: user.email,
      firstName: user.givenName,
      lastName: user.familyName,
      picture: user.photoUrl
    };

    dispatch({ type: STORE_USER, payload: userObject });

    await AsyncStorage.setItem('google_token', accessToken);

    dispatch({ type: GOOGLE_LOGIN_SUCCESS, payload: accessToken });
  }

  if (type === 'cancel') {
    return dispatch({ type: GOOGLE_LOGIN_FAIL });
  }
};

import { STORE_BEARER_TOKEN } from '../actions/authenticationTypes';
import { Font, Asset } from 'expo';
import { Alert } from 'react-native';
import images from '../assets/images';
import axios from 'axios';

export default class StoreProvider {
  static async loadAssetsAsync(store) {
    const state = store.getState();

    const params = {
      Username: '!S3Lvmue1uhjaT4vr#6fyVIiMO1AijD4hKn2gRObRPGzbF4TSe',
      Password:
        '13NzgZpJT8Unk#q^jz!b9R1Da#h8sit9XgAXsuwEb&Fa&I3L89Rj5^Qp$d^MKVtpHDZ@M6JomuBHsvI2uMWY7GNL@gJ*ATmX1u6MMuF77GvHB9BzD66nJcimn1thhpb$u1$xt256pb&iMTutt#U#d8Q@gR6MwRlx6iD3M*fzZe5WIhy3K@DRMofsD6d#X@MMHOWiv*w2jpdGdSVPoGu2*GOT!E$Mk7S#44eef4xwFBT%VyKo16m6&25rhfP551Oh'
    };

    const today = new Date();
    const token_expiration_date = new Date(state.bearerTokenReducer.bearer_token_expiration_date);

    if (
      !state.bearerTokenReducer.bearer_token ||
      state.bearerTokenReducer.bearer_token === '' ||
      today > token_expiration_date
    ) {
      await axios({
        method: 'POST',
        url: 'https://codersfootprint.apphb.com/api/Token',
        timeout: 60000,
        data: params
      })
        .then(function(response) {
          if (response.status === 200) {
            const object = {
              bearer_token: response.data.Token,
              bearer_token_expiration_date: response.data.Expires_At
            };

            store.dispatch({ type: STORE_BEARER_TOKEN, payload: object });
          }
        })
        .catch(error => {
          console.log(error);
          Alert.alert('API Error!', 'The error is ' + error, [{ text: 'Ok', onPress: () => {} }]);
        });
    }

    await Font.loadAsync({
      'League Spartan': require('../assets/fonts/leaguespartan-bold.ttf'),
      Helvetica: require('../assets/fonts/Helvetica.ttf')
    });

    await images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    });
  }
}

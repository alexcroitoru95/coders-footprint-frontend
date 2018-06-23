import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signInSocial, emailInputChange, userAgreementAction } from '../actions';
import { AsyncStorage, Alert } from 'react-native';
import { HorizontalLineWithText, FacebookButton, GoogleButton } from '../components';
import backgroundImage from '../assets/images/homeScreen.png';
import logo from '../assets/images/logo.png';
import _ from 'lodash';

import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  NativeModules,
  Platform
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const { StatusBarManager } = NativeModules;
const TOPBAR_HEIGHT = StatusBarManager.HEIGHT;

class WelcomeScreen extends Component {
  constructor(props) {
    super(props);

    this.checkIfTokenExists();
  }

  state = {
    emailInputText: ''
  };

  componentDidMount() {
    this.onAuthComplete(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.onAuthComplete(nextProps);
  }

  onAuthComplete(props) {
    if (props.token) {
      this.props.navigation.navigate('FullDetailsScreen');
    }
  }

  async onEmailInputSubmit() {
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (emailRegex.test(this.state.emailInputText) === true) {
      await this.props.emailInputChange(this.state.emailInputText);
      this.props.navigation.navigate('PartialDetailsScreen');
    } else {
      if (this.state.emailInputText === '') {
        Alert.alert(
          'Blank E-mail',
          'In order to use this application, you must enter a valid email address (ex: john@doe.com). Thank you!',
          [{ text: 'Ok', onPress: () => {} }]
        );
      } else {
        Alert.alert(
          'Invalid E-mail',
          'You have entered an invalid e-mail. In order to use this application, you must enter a valid email address (ex: john@doe.com). Thank you!',
          [{ text: 'Ok', onPress: () => {} }]
        );
      }
    }
  }

  async checkIfTokenExists() {
    let facebookToken = await AsyncStorage.getItem('fb_token');
    let googleToken = await AsyncStorage.getItem('google_token');
    let emailToken = await AsyncStorage.getItem('email_token');

    if (
      this.props.accountsInformation.GitHub_Tested &&
      this.props.accountsInformation.Microsoft_Tested &&
      this.props.accountsInformation.XDA_Tested &&
      this.props.accountsInformation.BugCrowd_Tested &&
      this.props.accountsInformation.StackOverflow_Tested &&
      this.props.accountsInformation.Google_Tested &&
      this.props.accountsInformation.DZone_Tested &&
      this.props.accountsInformation.Codecademy_Tested
    ) {
      this.props.navigation.navigate('ReviewScreen');
    } else {
      if (facebookToken || googleToken) {
        this.props.navigation.navigate('FullDetailsScreen');
      } else if (emailToken) {
        this.props.navigation.navigate('PartialDetailsScreen');
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.overlay}>
          <Image source={backgroundImage} style={styles.backgroundImage} />
        </View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View>
            <View style={styles.logoContainer}>
              <Image source={logo} style={styles.logo} />
              <Text style={styles.logoText}>Coder's Footprint</Text>
            </View>
            <View style={styles.centerContainer}>
              <View style={styles.buttonContainer}>
                <FacebookButton
                  onPress={() => {
                    Keyboard.dismiss();
                    this.props.signInSocial('facebook');
                  }}
                />
              </View>
              <View style={[styles.buttonContainer, { marginBottom: 15 }]}>
                <GoogleButton
                  onPress={() => {
                    Keyboard.dismiss();
                    this.props.signInSocial('google');
                  }}
                />
              </View>
              <HorizontalLineWithText />
              <View style={styles.inputContainer}>
                <TextInput
                  autoCapitalize="none"
                  clearTextOnFocus={true}
                  autoCorrect={false}
                  underlineColorAndroid="transparent"
                  keyboardType="email-address"
                  placeholder="Enter custom e-mail..."
                  placeholderTextColor="#778899"
                  style={{
                    flex: 1,
                    height: 40,
                    fontFamily: 'Helvetica',
                    backgroundColor: 'white',
                    borderColor: 'white',
                    borderWidth: 3,
                    borderRadius: 4
                  }}
                  onChangeText={emailInputText => this.setState({ emailInputText })}
                />
                <View style={{ width: 65, height: 40, marginLeft: 10 }}>
                  <TouchableHighlight
                    style={{
                      backgroundColor: '#67B5A7',
                      flex: 1,
                      borderRadius: 4,
                      justifyContent: 'center'
                    }}
                    onPress={() => this.onEmailInputSubmit()}
                  >
                    <Text
                      style={{
                        color: 'white',
                        textAlign: 'center',
                        fontFamily: 'Helvetica',
                        fontWeight: 'bold'
                      }}
                    >
                      GO!
                    </Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

function mapStateToProps({ auth, accounts, userAgreementReducer }) {
  return {
    token: auth.token,
    accountsInformation: accounts,
    userAgreementReducerInformation: userAgreementReducer
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        marginTop: 10
      },
      android: {
        marginTop: TOPBAR_HEIGHT
      }
    })
  },
  centerContainer: {
    flex: 2,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        marginTop: 20
      },
      android: {
        marginTop: 5
      }
    })
  },
  buttonContainer: {
    marginTop: 10
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: SCREEN_WIDTH - 100,
    ...Platform.select({
      ios: {
        marginTop: 20
      },
      android: {
        marginTop: 10
      }
    })
  },
  backgroundImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT
  },
  logo: {
    width: 120,
    height: 120
  },
  logoText: {
    fontFamily: 'League Spartan',
    fontSize: 25,
    textAlign: 'center',
    ...Platform.select({
      ios: {
        top: 25
      },
      android: {
        top: 10
      }
    }),
    color: 'white'
  },
  overlay: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 0
  }
});

export default connect(
  mapStateToProps,
  { signInSocial, emailInputChange, userAgreementAction }
)(WelcomeScreen);

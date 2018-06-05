import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  retypeEmail,
  stackDisplayNameInputChange,
  checkPlatformsAction,
  calculateTotalScoreNickname,
  userAgreementAction,
  clearUser,
  clearAccount
} from '../actions';
import * as Animatable from 'react-native-animatable';
import { LoadingForActions } from '../components';

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  TextInput,
  TouchableHighlight,
  Keyboard,
  Alert
} from 'react-native';

import { Ionicons, FontAwesome } from '@expo/vector-icons';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class PartialDetailsScreen extends Component {
  constructor(props) {
    super(props);

    this.userObject = {
      userEmail: props.user.email,
      userStackOverflowDisplayName: '',
      userBearerToken: props.bearerTokenInformation.bearer_token,
      platform: ''
    };

    if (props.userAgreementReducerInformation.stackOverflowDisplayNameAgreement === false) {
      setTimeout(function() {
        Alert.alert(
          'User Agreement',
          'Due to StackOverflow Privacy we cannot process your email in order to find if you have or not account on StackOverflow, so for us to show you your information on StackOverflow, we need your Display Name.\nWe will only show your information that we get from the StackOverflow API.\nThank you!',
          [
            {
              text: 'I Accept',
              onPress: () => {
                props.userAgreementAction('stackOverflowDisplayNameAgreed');
              },
              style: 'cancel'
            },
            {
              text: 'I Decline',
              onPress: () => {
                this.onRetypeEmail();
              },
              style: 'destructive'
            }
          ]
        );
      }, 50);
    }
  }

  state = {
    informationGatheredShown: 'infinite',
    stackDisplayNameInputText: '',
    loading: false
  };

  static getDerivedStateFromProps(nextProps) {
    if (
      nextProps.accountsInformation.GitHub_Tested &&
      nextProps.accountsInformation.Google_Tested &&
      nextProps.accountsInformation.BugCrowd_Tested &&
      nextProps.accountsInformation.Microsoft_Tested &&
      nextProps.accountsInformation.XDA_Tested &&
      nextProps.accountsInformation.DZone_Tested &&
      nextProps.accountsInformation.Codecademy_Tested &&
      nextProps.accountsInformation.StackOverflow_Tested
    ) {
      nextProps.navigation.navigate('ReviewScreen');

      return {
        loading: false
      };
    } else {
      return null;
    }
  }

  async onRetypeEmail() {
    const clearAccountsObject = {
      platform: 'ClearAccounts'
    };
    this.setState({ loading: true });
    await this.props.checkPlatformsAction(clearAccountsObject);
    await this.props.userAgreementAction('stackOverflowDisplayNameDeclined');
    await this.props.retypeEmail();
    this.setState({ loading: false });
    this.props.navigation.navigate('WelcomeScreen');
  }

  async onStackDisplayNameInputSubmit() {
    await this.props.stackDisplayNameInputChange(this.state.stackDisplayNameInputText);
    this.userObject.userStackOverflowDisplayName = this.props.user.stackOverflowDisplayName;

    this.setState({ loading: true });

    this.userObject.platform = 'GitHub';
    await this.props.checkPlatformsAction(this.userObject);

    this.userObject.platform = 'Microsoft';
    await this.props.checkPlatformsAction(this.userObject);

    this.userObject.platform = 'DZone';
    await this.props.checkPlatformsAction(this.userObject);

    this.userObject.platform = 'Codecademy';
    await this.props.checkPlatformsAction(this.userObject);

    this.userObject.platform = 'StackOverflow';
    await this.props.checkPlatformsAction(this.userObject);

    this.userObject.platform = 'XDA Developer';
    await this.props.checkPlatformsAction(this.userObject);

    this.userObject.platform = 'BugCrowd';
    await this.props.checkPlatformsAction(this.userObject);

    this.userObject.platform = 'Google';
    await this.props.checkPlatformsAction(this.userObject);
  }

  getNameFromEmailAddress() {
    const { email } = this.props.user;
    const name = email.substring(0, email.lastIndexOf('@'));

    return name;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.overlay}>
          <Image
            source={require('../assets/images/homeScreen.png')}
            style={styles.backgroundImage}
          />
        </View>
        {this.state.loading ? <LoadingForActions simple /> : null}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{ width: '100%', height: '100%' }}>
            <View style={styles.logoContainer}>
              <Image source={require('../assets/images/logo.png')} style={styles.logo} />
              <Text style={styles.logoText}>Welcome {this.getNameFromEmailAddress()}!</Text>
            </View>
            <View style={styles.centerContainer}>
              <View style={styles.avatar}>
                <TouchableHighlight
                  onPress={() => {
                    this.setState({ informationGatheredShown: 0 });
                    Alert.alert('Information Gathered', `Email: ${this.props.user.email}`, [
                      { text: 'Ok', onPress: () => {} }
                    ]);
                  }}
                >
                  <Animatable.View
                    animation="pulse"
                    easing="ease-out-quint"
                    iterationCount={this.state.informationGatheredShown}
                    style={{ width: 125, height: 125, backgroundColor: 'white', borderRadius: 50 }}
                  >
                    <FontAwesome name="user-secret" size={125} style={styles.avatarImage} />
                  </Animatable.View>
                </TouchableHighlight>
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  clearTextOnFocus={true}
                  placeholder="StackOverflow DisplayName"
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
                  onChangeText={stackDisplayNameInputText =>
                    this.setState({ stackDisplayNameInputText })
                  }
                />
                <View style={{ width: 65, height: 40, marginLeft: 10 }}>
                  <TouchableHighlight
                    style={{
                      backgroundColor: '#67B5A7',
                      flex: 1,
                      borderRadius: 4,
                      justifyContent: 'center'
                    }}
                    onPress={() => {
                      Keyboard.dismiss();
                      this.onStackDisplayNameInputSubmit();
                    }}
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
            <View style={styles.bottomContainer}>
              <TouchableHighlight
                style={{
                  backgroundColor: '#C70039',
                  flex: 1,
                  borderRadius: 4,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 10,
                  marginLeft: 10
                }}
                onPress={() => {
                  this.onRetypeEmail();
                }}
              >
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    fontFamily: 'Helvetica',
                    fontSize: 12.5,
                    fontWeight: 'bold'
                  }}
                >
                  Retype Email
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    bearerTokenInformation: state.bearerTokenReducer,
    accountsInformation: state.accounts,
    userAgreementReducerInformation: state.userAgreementReducer
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  overlay: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 0
  },
  backgroundImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT
  },
  logoContainer: {
    flex: 1,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  centerContainer: {
    flex: 2,
    alignItems: 'center',
    marginTop: 20
  },
  avatar: {
    marginBottom: 10
  },
  avatarImage: {
    flex: 1,
    color: 'black',
    textAlign: 'center',
    marginLeft: 10
  },
  logo: {
    width: 120,
    height: 120
  },
  logoText: {
    fontFamily: 'League Spartan',
    color: 'white',
    fontSize: 17,
    textAlign: 'center',
    top: 20
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: SCREEN_WIDTH - 100,
    marginTop: 20
  },
  bottomContainer: {
    width: SCREEN_WIDTH - 240,
    height: 40
  }
});

export default connect(
  mapStateToProps,
  {
    retypeEmail,
    stackDisplayNameInputChange,
    checkPlatformsAction,
    calculateTotalScoreNickname,
    userAgreementAction,
    clearUser,
    clearAccount
  }
)(PartialDetailsScreen);

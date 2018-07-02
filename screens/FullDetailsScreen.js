import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  revokeAppPermissions,
  stackDisplayNameInputChange,
  checkPlatformsAction,
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
  Alert,
  BackHandler,
  NativeModules,
  Platform
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const { StatusBarManager } = NativeModules;
const TOPBAR_HEIGHT = StatusBarManager.HEIGHT;

class FullDetailsScreen extends Component {
  constructor(props) {
    super(props);

    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);

    this.userObject = {
      userEmail: props.user.email,
      userStackOverflowDisplayName: '',
      userBearerToken: props.bearerTokenInformation.bearer_token,
      platform: '',
      GitHub: props.accountsInformation.GitHub,
      GitHub_Tested: props.accountsInformation.GitHub_Tested,
      StackOverflow: props.accountsInformation.StackOverflow,
      StackOverflow_Tested: props.accountsInformation.StackOverflow_Tested,
      Microsoft: props.accountsInformation.Microsoft,
      Microsoft_Tested: props.accountsInformation.Microsoft_Tested,
      Google: props.accountsInformation.Google,
      Google_Tested: props.accountsInformation.Google_Tested,
      Apple: props.accountsInformation.Apple,
      Apple_Tested: props.accountsInformation.Apple_Tested,
      BugCrowd: props.accountsInformation.BugCrowd,
      BugCrowd_Tested: props.accountsInformation.BugCrowd_Tested,
      XDA: props.accountsInformation.XDA,
      XDA_Tested: props.accountsInformation.XDA_Tested,
      GitHub_Username: props.accountsInformation.GitHub_Username,
      GitHub_Repositories: props.accountsInformation.GitHub_Repositories,
      GitHub_Organizations: props.accountsInformation.GitHub_Organizations,
      GitHub_Followers: props.accountsInformation.GitHub_Followers,
      GitHub_Location: props.accountsInformation.GitHub_Location,
      GitHub_Subscriptions: props.accountsInformation.GitHub_Subscriptions,
      StackOverflow_Questions: props.accountsInformation.StackOverflow_Questions,
      StackOverflow_Answers: props.accountsInformation.StackOverflow_Answers,
      StackOverflow_Comments: props.accountsInformation.StackOverflow_Comments,
      StackOverflow_Location: props.accountsInformation.StackOverflow_Location,
      StackOverflow_SameDisplayName: props.accountsInformation.StackOverflow_SameDisplayName,
      Total_Points_Final_Value: props.accountsInformation.Total_Points_Final_Value,
      Nickname: props.accountsInformation.Nickname
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
                this.onRevokePermissions();
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

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

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

  async onRevokePermissions() {
    const clearAccountsObject = {
      platform: 'ClearAccounts'
    };
    this.setState({ loading: true });
    await this.props.checkPlatformsAction(clearAccountsObject);
    await this.props.userAgreementAction('stackOverflowDisplayNameDeclined');
    await this.props.revokeAppPermissions();
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

  renderImageUser() {
    const { picture } = this.props.user;

    if (String(picture).length > 0) {
      return (
        <TouchableHighlight
          onPress={() => {
            this.setState({ informationGatheredShown: 0 });
            Alert.alert(
              'Information Gathered',
              `Name: ${this.props.user.firstName} ${this.props.user.lastName}, Email: ${
                this.props.user.email
              }, Profile Picture`,
              [{ text: 'Ok', onPress: () => {} }]
            );
          }}
        >
          <Animatable.Image
            animation="pulse"
            easing="ease-out-quint"
            iterationCount={this.state.informationGatheredShown}
            source={{
              uri: picture
            }}
            style={styles.avatarImage}
          />
        </TouchableHighlight>
      );
    }

    return null;
  }

  renderTextUser() {
    const { firstName, lastName } = this.props.user;

    if (String(firstName).length > 0 && String(lastName).length > 0) {
      return (
        <Text style={styles.logoText}>
          Welcome {this.props.user.firstName} {this.props.user.lastName}
        </Text>
      );
    }

    if (String(firstName) === undefined) {
      return <Text style={styles.logoText}>Welcome {this.props.user.lastName}</Text>;
    }

    if (String(lastName) === undefined) {
      return <Text style={styles.logoText}>Welcome {this.props.user.firstName}</Text>;
    }
  }

  handleBackButtonClick = () => {
    Alert.alert(
      'For your information',
      'In order to go back you need to press RevokeAppPermissions.\n\nThank you!',
      [{ text: 'Ok', onPress: () => {} }]
    );
    return true;
  };

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
              {this.renderTextUser()}
            </View>
            <View style={styles.centerContainer}>
              <View style={styles.avatar}>{this.renderImageUser()}</View>
              <View style={styles.inputContainer}>
                <TextInput
                  clearTextOnFocus={true}
                  autoCorrect={false}
                  underlineColorAndroid="transparent"
                  placeholder="Stack DisplayName or Id"
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
                  this.onRevokePermissions();
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
                  Revoke App Permissions
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
    ...Platform.select({
      ios: {
        marginTop: 10
      },
      android: {
        marginTop: TOPBAR_HEIGHT
      }
    }),
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
    borderRadius: 50,
    height: 125,
    width: 125
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
    ...Platform.select({
      ios: {
        marginTop: 20
      },
      android: {
        marginTop: 10
      }
    })
  },
  bottomContainer: {
    ...Platform.select({
      ios: {
        width: SCREEN_WIDTH - 210
      },
      android: {
        width: SCREEN_WIDTH - 200
      }
    }),
    height: 40
  }
});

export default connect(
  mapStateToProps,
  {
    revokeAppPermissions,
    stackDisplayNameInputChange,
    checkPlatformsAction,
    userAgreementAction,
    clearUser,
    clearAccount
  }
)(FullDetailsScreen);

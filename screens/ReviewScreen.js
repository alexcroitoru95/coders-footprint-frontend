import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  revokeAppPermissions,
  clearUser,
  clearAccount,
  checkPlatformsAction,
  sendEmailWithData,
  userAgreementAction,
  deleteUserData
} from '../actions';
import * as Animatable from 'react-native-animatable';
import * as Progress from 'react-native-progress';
import Toast from 'react-native-root-toast';
import { LoadingForActions } from '../components';

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  TouchableHighlight,
  Alert,
  Platform,
  BackHandler
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const userDataForGDPRReducer = {
  Email: '',
  BearerToken: ''
};

class ReviewScreen extends Component {
  constructor(props) {
    super(props);

    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);

    this.points = this.props.accountsInformation.Total_Points_Final_Value;
    this.getNickname(this.points);

    userDataForGDPRReducer.Email = props.userInformation.email;
    userDataForGDPRReducer.BearerToken = props.bearerTokenReducer.bearer_token;
  }

  state = {
    informationGatheredShownSO: 'infinite',
    informationGatheredShownGitHub: 'infinite',
    stackOverflowToastVisible: false,
    gitHubToastVisible: false,
    loading: false
  };

  componentDidMount() {
    if (this.props.accountsInformation.StackOverflow_SameDisplayName === true) {
      Alert.alert(
        'Same Display Name',
        'Multiple users with same display name have been detected on StackOverflow!\n Please try again and enter id of user, if this is not you.\n\n Thank you!',
        [{ text: 'Ok', onPress: () => {} }]
      );
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.gdprReducerInformation.dataDeleted) {
      nextProps.gdprReducerInformation.dataDeleted = false;
      Alert.alert(
        'Data Deleted',
        'We have deleted all of your data that has been processed on Coder`s Footprint.\n\nThank you!',
        [{ text: 'Ok', onPress: () => {} }]
      );
      return {
        loading: false
      };
    }

    if (nextProps.gdprReducerInformation.emailSent) {
      nextProps.gdprReducerInformation.emailSent = false;
      Alert.alert(
        'E-mail Sent',
        'We have sent you an email with all of your data that has been processed on Coder`s Footprint in CSV format.\n\nThank you!',
        [{ text: 'Ok', onPress: () => {} }]
      );
      return {
        loading: false
      };
    }
  }

  async onRevokePermissions() {
    const clearAccountsObject = {
      platform: 'ClearAccounts'
    };
    this.setState({ loading: true });
    await this.props.checkPlatformsAction(clearAccountsObject);
    await this.props.userAgreementAction('stackOverflowDisplayNameDeclined');
    this.props.navigation.navigate('WelcomeScreen');
    await this.props.revokeAppPermissions();
  }

  getNickname(points) {
    if (points >= 0 && points < 25) {
      this.props.accountsInformation.Nickname = 'Just Started';
    }
    if (points >= 25 && points < 50) {
      this.props.accountsInformation.Nickname = 'Average Coder';
    }
    if (points >= 50 && points < 85) {
      this.props.accountsInformation.Nickname = 'Epic Coder';
    }
    if (points >= 85 && points <= 100) {
      this.props.accountsInformation.Nickname = 'God of Coders';
    }
  }

  checkLocation(location) {
    if (location === null || location === '') {
      return 'Not Listed';
    } else {
      return location;
    }
  }

  checkPlatforms(platform) {
    switch (platform) {
      case 'GitHub':
        if (this.props.accountsInformation.GitHub === true) {
          return (
            <TouchableHighlight onPress={this.showGitHubToast}>
              <View>
                <Animatable.Image
                  animation="pulse"
                  easing="ease-out-quint"
                  iterationCount={this.state.informationGatheredShownGitHub}
                  source={require('../assets/images/github_logo.png')}
                  style={{ width: 70, height: 70, margin: 10 }}
                />
                <Toast
                  visible={this.state.gitHubToastVisible}
                  position={Toast.positions.CENTER}
                  hideOnPress={false}
                  backgroundColor="#ffffff"
                  textColor="#000000"
                  shadowColor="#24A4B1"
                >
                  GitHub User Info{'\n'}Username: {this.props.accountsInformation.GitHub_Username}
                  {'\n'}Repositories: {this.props.accountsInformation.GitHub_Repositories}
                  {'\n'}Followers:
                  {this.props.accountsInformation.GitHub_Followers}
                  {'\n'}Subscriptions: {this.props.accountsInformation.GitHub_Subscriptions}
                  {'\n'}Location:{' '}
                  {this.checkLocation(this.props.accountsInformation.GitHub_Location)}
                </Toast>
              </View>
            </TouchableHighlight>
          );
        }
        break;
      case 'DZone':
        if (this.props.accountsInformation.DZone === true) {
          return (
            <Image
              source={require('../assets/images/dzone_logo.png')}
              style={{ width: 70, height: 70, margin: 10 }}
            />
          );
        }
        break;
      case 'Microsoft':
        if (this.props.accountsInformation.Microsoft === true) {
          return (
            <Image
              source={require('../assets/images/microsoft_logo.png')}
              style={{ width: 70, height: 70, margin: 10 }}
            />
          );
        }
        break;
      case 'StackOverflow':
        const stackOverflowUsersWithSameName = '';
        const displayNameRegex = /^[0-9]*$/;

        if (this.props.accountsInformation.StackOverflow_SameDisplayName === true) {
          stackOverflowUsersWithSameName = 'Yes';
        } else {
          stackOverflowUsersWithSameName = 'No';
        }
        if (displayNameRegex.test(this.props.userInformation.stackOverflowDisplayName) === true) {
          this.props.userInformation.stackOverflowDisplayName = this.props.accountsInformation.stackOverflowGetNameBySearchingId;
        }
        if (this.props.accountsInformation.StackOverflow === true) {
          return (
            <TouchableHighlight onPress={this.showStackOverflowToast}>
              <View>
                <Animatable.Image
                  animation="pulse"
                  easing="ease-out-quint"
                  iterationCount={this.state.informationGatheredShownSO}
                  source={require('../assets/images/so_logo.png')}
                  style={{ width: 70, height: 70, margin: 10 }}
                />
                <Toast
                  visible={this.state.stackOverflowToastVisible}
                  position={Toast.positions.CENTER}
                  hideOnPress={false}
                  backgroundColor="#ffffff"
                  textColor="#000000"
                  shadowColor="#24A4B1"
                >
                  StackOverflow User Info{'\n'}Display Name :{' '}
                  {this.props.userInformation.stackOverflowDisplayName}
                  {'\n'}Users With Same Name: {stackOverflowUsersWithSameName}
                  {'\n'}Questions:
                  {this.props.accountsInformation.StackOverflow_Questions}
                  {'\n'}Answers: {this.props.accountsInformation.StackOverflow_Answers}
                  {'\n'}Comments: {this.props.accountsInformation.StackOverflow_Comments}
                  {'\n'}Location:{' '}
                  {this.checkLocation(this.props.accountsInformation.StackOverflow_Location)}
                </Toast>
              </View>
            </TouchableHighlight>
          );
        }
        break;
      case 'XDA Developer':
        if (this.props.accountsInformation.XDA === true) {
          return (
            <Image
              source={require('../assets/images/xda_logo.png')}
              style={{ width: 70, height: 70, margin: 10 }}
            />
          );
        }
        break;
      case 'BugCrowd':
        if (this.props.accountsInformation.BugCrowd === true) {
          return (
            <Image
              source={require('../assets/images/bugcrowd_logo.png')}
              style={{ width: 70, height: 70, margin: 10 }}
            />
          );
        }
        break;
      case 'Codecademy':
        if (this.props.accountsInformation.Codecademy === true) {
          return (
            <Image
              source={require('../assets/images/codecademy_logo.png')}
              style={{ width: 70, height: 70, margin: 10 }}
            />
          );
        }
        break;
      case 'Google':
        if (this.props.accountsInformation.Google === true) {
          return (
            <Image
              source={require('../assets/images/google_logo.png')}
              style={{ width: 70, height: 70, margin: 10 }}
            />
          );
        }
        break;
      default:
        break;
    }
  }

  progressBarPercentage = this.props.accountsInformation.Total_Points_Final_Value * 0.01;

  async deleteUserDataFromDB() {
    this.setState({ loading: true });

    await this.props.deleteUserData(userDataForGDPRReducer);
  }

  async sendEmailWithUserData() {
    this.setState({ loading: true });

    await this.props.sendEmailWithData(userDataForGDPRReducer);
  }

  handleBackButtonClick = () => {
    Alert.alert(
      'For your information',
      'In order to go back you need to press RevokeAppPermissions.\n\nThank you!',
      [{ text: 'Ok', onPress: () => {} }]
    );
    return true;
  };

  showStackOverflowToast = () => {
    this.setState({ stackOverflowToastVisible: true });
    this.setState({ gitHubToastVisible: false });
    this.setState({ informationGatheredShownSO: 0 });
  };

  showGitHubToast = () => {
    this.setState({ gitHubToastVisible: true });
    this.setState({ stackOverflowToastVisible: false });
    this.setState({ informationGatheredShownGitHub: 0 });
  };

  hideToast = () => {
    if (this.state.gitHubToastVisible === true) {
      this.setState({ gitHubToastVisible: false });
    }
    if (this.state.stackOverflowToastVisible === true) {
      this.setState({ stackOverflowToastVisible: false });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.hideToast} accessible={false}>
          <View style={{ width: '100%', height: '100%' }}>
            <View style={styles.overlay}>
              <Image
                source={require('../assets/images/homeScreen.png')}
                style={styles.backgroundImage}
              />
            </View>
            {this.state.loading ? <LoadingForActions simple /> : null}
            <View style={{ width: '100%', height: '100%' }}>
              <View style={styles.scoreContainer}>
                <Animatable.Text
                  animation="flash"
                  easing="ease-in-sine"
                  iterationCount="infinite"
                  style={styles.scoreText}
                >
                  {this.props.accountsInformation.Nickname}
                </Animatable.Text>
                <View style={styles.progressBarContainer}>
                  <Progress.Bar
                    progress={this.progressBarPercentage}
                    animationType="timing"
                    color="#24A4B1"
                    width={SCREEN_WIDTH - 150}
                    height={SCREEN_HEIGHT / 25}
                  />
                  <Text
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      fontFamily: 'Helvetica',
                      fontWeight: 'bold',
                      fontSize: 20,
                      marginLeft: 10
                    }}
                  >
                    {this.props.accountsInformation.Total_Points_Final_Value}%
                  </Text>
                </View>
              </View>
              <View style={styles.centerContainer}>
                <View
                  style={{
                    justifyContent: 'center'
                  }}
                >
                  <Text style={styles.accountsText}>You Have Accounts On</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  {this.checkPlatforms('DZone')}

                  {this.checkPlatforms('XDA Developer')}

                  {this.checkPlatforms('Codecademy')}

                  {this.checkPlatforms('GitHub')}
                </View>
                <View style={{ flexDirection: 'row', marginTop: 30 }}>
                  {this.checkPlatforms('BugCrowd')}

                  {this.checkPlatforms('StackOverflow')}

                  {this.checkPlatforms('Microsoft')}

                  {this.checkPlatforms('Google')}
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
                    Alert.alert(
                      'Delete Your Data',
                      'Are you sure you want to delete your data that has been processed on Coder`s Footprint?\nIf your answer is yes please press I Accept, if not please press I Decline.\n',
                      [
                        {
                          text: 'I Accept',
                          onPress: () => {
                            this.deleteUserDataFromDB();
                          },
                          style: 'destructive'
                        },
                        { text: 'I Decline', onPress: () => {}, style: 'cancel' }
                      ]
                    );
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
                    Delete All My Data
                  </Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={{
                    backgroundColor: '#67B5A7',
                    flex: 1,
                    borderRadius: 4,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 15,
                    marginTop: 5,
                    marginLeft: 10
                  }}
                  onPress={() => {
                    Alert.alert(
                      'Email with Your Data',
                      'If you press Ok we will send you an email with all of your information that has been processed on Coder`s Footprint in CSV format.\nIf you don`t want this please press Cancel.\n',
                      [
                        {
                          text: 'Ok',
                          onPress: () => {
                            this.sendEmailWithUserData();
                          },
                          style: 'default'
                        },
                        { text: 'Cancel', onPress: () => {}, style: 'cancel' }
                      ]
                    );
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
                    Send Email With My Data
                  </Text>
                </TouchableHighlight>
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
                    Alert.alert(
                      'Revoke All Permissions',
                      'If you press I Accept we will revoke all permissions that you gave if you logged in with Facebook or Google+, also we will delete this sessions data, including your email, your result, your name and profile picture that has been processed on Coder`s Footprint. The data that we previously mentioned will not be deleted from our database, for that please press Delete All My Data.\nIf you don`t want this please press Cancel.\n',
                      [
                        {
                          text: 'I Accept',
                          onPress: () => {
                            this.onRevokePermissions();
                          },
                          style: 'destructive'
                        },
                        { text: 'Cancel', onPress: () => {}, style: 'cancel' }
                      ]
                    );
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
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    userInformation: state.user,
    accountsInformation: state.accounts,
    bearerTokenReducer: state.bearerTokenReducer,
    gdprReducerInformation: state.gdprReducer
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
  scoreContainer: {
    marginTop: 50,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  progressBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 15
  },
  pieChart: {
    height: 200,
    position: 'absolute',
    left: 0,
    right: 0
  },
  scoreText: {
    fontFamily: 'League Spartan',
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 30
  },
  accountsText: {
    fontFamily: 'League Spartan',
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 30,
    textDecorationLine: 'underline'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: SCREEN_WIDTH - 100,
    marginTop: 30
  },
  bottomContainer: {
    ...Platform.select({
      ios: {
        width: SCREEN_WIDTH - 210
      },
      android: {
        width: SCREEN_WIDTH - 190
      }
    }),
    height: 130
  },
  mainTableHead: {
    height: 10,
    backgroundColor: '#f1f8ff'
  },
  mainTableData: {
    margin: 1
  }
});

export default connect(
  mapStateToProps,
  {
    revokeAppPermissions,
    clearUser,
    clearAccount,
    checkPlatformsAction,
    sendEmailWithData,
    userAgreementAction,
    deleteUserData
  }
)(ReviewScreen);

import axios from 'axios';
import { STORE_ACCOUNTS, CLEAR_ACCOUNTS } from '../authenticationTypes';
import { Alert, AsyncStorage } from 'react-native';

const accountsObject = {
  GitHub: false,
  GitHub_Tested: false,
  StackOverflow: false,
  StackOverflow_Tested: false,
  Microsoft: false,
  Microsoft_Tested: false,
  Google: false,
  Google_Tested: false,
  DZone: false,
  DZone_Tested: false,
  BugCrowd: false,
  BugCrowd_Tested: false,
  Codecademy: false,
  Codecademy_Tested: false,
  XDA: false,
  XDA_Tested: false,
  GitHub_Username: '',
  GitHub_Repositories: 0,
  GitHub_Organizations: 0,
  GitHub_Followers: 0,
  GitHub_Subscriptions: 0,
  StackOverflow_Questions: 0,
  StackOverflow_Answers: 0,
  StackOverflow_Comments: 0,
  Total_Points_Final_Value: 0,
  Nickname: ''
};

const userObject = {
  userEmail: '',
  userBearerToken: '',
  userStackOverflowDisplayName: '',
  platform: ''
};

const requestHeaders = {
  Authorization: ''
};

const requestParams = {
  Email: ''
};

export const checkPlatformsAction = user => async dispatch => {
  userObject.userEmail = user.userEmail;
  userObject.userBearerToken = user.userBearerToken;
  userObject.userStackOverflowDisplayName = user.userStackOverflowDisplayName;
  userObject.platform = user.platform;

  switch (userObject.platform) {
    case 'GitHub':
      await checkGitHubAccount(dispatch);
      break;
    case 'DZone':
      await checkDZoneAccount(dispatch);
      break;
    case 'Microsoft':
      await checkMicrosoftAccount(dispatch);
      break;
    case 'StackOverflow':
      // await checkStackOverflowAccount(dispatch);
      // if (user.StackOverflow === true) {
      if (userObject.userStackOverflowDisplayName !== '') {
        await checkStackOverflowMoreDetails(dispatch);
      } else {
        accountsObject.StackOverflow_Tested = true;
        accountsObject.StackOverflow = false;
        dispatch({ type: STORE_ACCOUNTS, payload: accountsObject });
      }
      // }
      break;
    case 'XDA Developer':
      await checkXDADevAccount(dispatch);
      break;
    case 'BugCrowd':
      await checkBugCrowdAccount(dispatch);
      break;
    case 'Codecademy':
      await checkCodecademyAccount(dispatch);
      break;
    case 'Google':
      const googleToken = await AsyncStorage.getItem('google_token');
      if (!googleToken) {
        await checkGoogleAccount(dispatch);
      } else {
        accountsObject.Google_Tested = true;
        accountsObject.Google = true;
        dispatch({ type: STORE_ACCOUNTS, payload: accountsObject });
      }
      break;
    case 'ClearAccounts':
      await clearAccounts(dispatch);
      break;
    default:
      break;
  }
};

const checkGoogleAccount = dispatch => {
  requestParams.Email = userObject.userEmail;
  requestHeaders.Authorization = userObject.userBearerToken;

  axios({
    method: 'POST',
    url: 'https://codersfootprintapp.azurewebsites.net/api/Platforms/Google/',
    timeout: 180000,
    data: requestParams,
    headers: requestHeaders
  })
    .then(function(response) {
      accountsObject.Google_Tested = true;
      if (response.status === 200) {
        if (response.data.Platforms[0].Web_Driver_Wait_Until_Timed_Out === false) {
          accountsObject.Total_Points_Final_Value += response.data.Platforms[0].Points;
          accountsObject.Google = response.data.Platforms[0].Has_Account;
          console.log(accountsObject);

          dispatch({ type: STORE_ACCOUNTS, payload: accountsObject });
        } else {
          Alert.alert(
            'Google Timed Out!',
            'Your response took to much time to appear. Please try again!' + error,
            [
              {
                text: 'Ok',
                onPress: () => {
                  // checkPlatforms(
                  //   userObject.userEmail,
                  //   userObject.userStackOverflowDisplayName,
                  //   userObject.userBearerToken,
                  //   'Google'
                  // );
                }
              },
              { text: 'Cancel', onPress: () => {} }
            ]
          );
        }
      }
    })
    .catch(error => {
      accountsObject.Google_Tested = true;
      console.log(error);
    });
};

const checkDZoneAccount = dispatch => {
  requestParams.Email = userObject.userEmail;
  requestHeaders.Authorization = userObject.userBearerToken;

  axios({
    method: 'POST',
    url: 'https://codersfootprintapp.azurewebsites.net/api/Platforms/DZone/',
    timeout: 180000,
    data: requestParams,
    headers: requestHeaders
  })
    .then(function(response) {
      accountsObject.DZone_Tested = true;
      if (response.status === 200) {
        if (response.data.Platforms[0].Web_Driver_Wait_Until_Timed_Out === false) {
          accountsObject.Total_Points_Final_Value += response.data.Platforms[0].Points;
          accountsObject.DZone = response.data.Platforms[0].Has_Account;
          console.log(accountsObject);

          dispatch({ type: STORE_ACCOUNTS, payload: accountsObject });
        } else {
          Alert.alert(
            'DZone Timed Out!',
            'Your response took to much time to appear. Please try again!' + error,
            [
              {
                text: 'Ok',
                onPress: () => {
                  // checkPlatforms(
                  //   userObject.userEmail,
                  //   userObject.userStackOverflowDisplayName,
                  //   userObject.userBearerToken,
                  //   'Apple'
                  // );
                }
              },
              { text: 'Cancel', onPress: () => {} }
            ]
          );
        }
      }
    })
    .catch(error => {
      accountsObject.DZone_Tested = true;
      console.log(error);
    });
};

const checkMicrosoftAccount = dispatch => {
  requestParams.Email = userObject.userEmail;
  requestHeaders.Authorization = userObject.userBearerToken;

  axios({
    method: 'POST',
    url: 'https://codersfootprintapp.azurewebsites.net/api/Platforms/Microsoft/',
    timeout: 180000,
    data: requestParams,
    headers: requestHeaders
  })
    .then(function(response) {
      accountsObject.Microsoft_Tested = true;
      if (response.status === 200) {
        if (response.data.Platforms[0].Web_Driver_Wait_Until_Timed_Out === false) {
          accountsObject.Total_Points_Final_Value += response.data.Platforms[0].Points;
          accountsObject.Microsoft = response.data.Platforms[0].Has_Account;
          console.log(accountsObject);

          dispatch({ type: STORE_ACCOUNTS, payload: accountsObject });
        } else {
          Alert.alert(
            'Microsoft Timed Out!',
            'Your response took to much time to appear. Please try again!' + error,
            [
              {
                text: 'Ok',
                onPress: () => {
                  // checkPlatforms(
                  //   userObject.userEmail,
                  //   userObject.userStackOverflowDisplayName,
                  //   userObject.userBearerToken,
                  //   'Microsoft'
                  // );
                }
              },
              { text: 'Cancel', onPress: () => {} }
            ]
          );
        }
      }
    })
    .catch(error => {
      accountsObject.Microsoft_Tested = true;
      console.log(error);
    });
};

const checkGitHubAccount = dispatch => {
  requestParams.Email = userObject.userEmail;
  requestHeaders.Authorization = userObject.userBearerToken;

  axios({
    method: 'POST',
    url: 'https://codersfootprintapp.azurewebsites.net/api/GitHub/GetUserProfile/',
    timeout: 180000,
    data: requestParams,
    headers: requestHeaders
  })
    .then(function(response) {
      accountsObject.GitHub_Tested = true;
      if (response.status === 200) {
        if (response.data.Username !== 'none') {
          accountsObject.GitHub = true;
          accountsObject.GitHub_Username = response.data.Username;
          accountsObject.GitHub_Followers = response.data.Followers;
          accountsObject.GitHub_Organizations = response.data.Organizations;
          accountsObject.GitHub_Repositories = response.data.TotalRepositories;
          accountsObject.GitHub_Subscriptions = response.data.Subscriptions;
          accountsObject.Total_Points_Final_Value += response.data.Total_Points;
          console.log(accountsObject);

          dispatch({ type: STORE_ACCOUNTS, payload: accountsObject });
        }
      }
    })
    .catch(error => {
      accountsObject.GitHub_Tested = true;
      console.log(error);
    });
};

const checkStackOverflowAccount = dispatch => {
  requestParams.Email = userObject.userEmail;
  requestHeaders.Authorization = userObject.userBearerToken;

  axios({
    method: 'POST',
    url: 'https://codersfootprintapp.azurewebsites.net/api/Platforms/StackOverflow/',
    timeout: 180000,
    data: requestParams,
    headers: requestHeaders
  })
    .then(function(response) {
      accountsObject.StackOverflow_Tested = true;
      if (response.status === 200) {
        if (response.data.Platforms[0].Web_Driver_Wait_Until_Timed_Out === false) {
          accountsObject.Total_Points_Final_Value += response.data.Platforms[0].Points;
          accountsObject.StackOverflow = response.data.Platforms[0].Has_Account;
          console.log(accountsObject);

          dispatch({ type: STORE_ACCOUNTS, payload: accountsObject });
        } else {
          Alert.alert(
            'StackOverflow Timed Out!',
            'Your response took to much time to appear. Please try again!' + error,
            [
              {
                text: 'Ok',
                onPress: () => {
                  // checkPlatforms(
                  //   userObject.userEmail,
                  //   userObject.userStackOverflowDisplayName,
                  //   userObject.userBearerToken,
                  //   'StackOverflow'
                  // );
                }
              },
              { text: 'Cancel', onPress: () => {} }
            ]
          );
        }
      }
    })
    .catch(error => {
      accountsObject.StackOverflow_Tested = true;
      console.log(error);
    });
};

const checkStackOverflowMoreDetails = dispatch => {
  const stackOverflowParams = {
    DisplayName: userObject.userStackOverflowDisplayName,
    Email: userObject.userEmail
  };

  requestHeaders.Authorization = userObject.userBearerToken;

  axios({
    method: 'POST',
    url: 'https://codersfootprintapp.azurewebsites.net/api/StackOverflow/GetUserProfile',
    timeout: 180000,
    data: stackOverflowParams,
    headers: requestHeaders
  })
    .then(function(response) {
      accountsObject.StackOverflow_Tested = true;
      if (response.status === 200) {
        accountsObject.StackOverflow = true;
        if (accountsObject.StackOverflow === true) {
          accountsObject.StackOverflow_Questions = response.data.Questions;
          accountsObject.StackOverflow_Answers = response.data.Answers;
          accountsObject.StackOverflow_Comments = response.data.Comments;
          accountsObject.Total_Points_Final_Value += response.data.Total_Points;
          console.log(accountsObject);

          dispatch({ type: STORE_ACCOUNTS, payload: accountsObject });
        }
      }
    })
    .catch(error => {
      accountsObject.StackOverflow_Tested = true;
      console.log(error);
    });
};

const checkXDADevAccount = dispatch => {
  requestParams.Email = userObject.userEmail;
  requestHeaders.Authorization = userObject.userBearerToken;

  axios({
    method: 'POST',
    url: 'https://codersfootprintapp.azurewebsites.net/api/Platforms/XDADev/',
    timeout: 180000,
    data: requestParams,
    headers: requestHeaders
  })
    .then(function(response) {
      accountsObject.XDA_Tested = true;
      if (response.status === 200) {
        if (response.data.Platforms[0].Web_Driver_Wait_Until_Timed_Out === false) {
          accountsObject.Total_Points_Final_Value += response.data.Platforms[0].Points;
          accountsObject.XDA = response.data.Platforms[0].Has_Account;
          console.log(accountsObject);

          dispatch({ type: STORE_ACCOUNTS, payload: accountsObject });
        } else {
          Alert.alert(
            'XDA Dev Timed Out!',
            'Your response took to much time to appear. Please try again!' +
              error[
                ({
                  text: 'Ok',
                  onPress: () => {
                    //       checkPlatforms(
                    //         userObject.userEmail,
                    //         userObject.userStackOverflowDisplayName,
                    //         userObject.userBearerToken,
                    //         'XDA Developer'
                    //       );
                  }
                },
                { text: 'Cancel', onPress: () => {} })
              ]
          );
        }
      }
    })
    .catch(error => {
      accountsObject.XDA_Tested = true;
      console.log(error);
    });
};

const checkBugCrowdAccount = dispatch => {
  requestParams.Email = userObject.userEmail;
  requestHeaders.Authorization = userObject.userBearerToken;

  axios({
    method: 'POST',
    url: 'https://codersfootprintapp.azurewebsites.net/api/Platforms/BugCrowd/',
    timeout: 180000,
    data: requestParams,
    headers: requestHeaders
  })
    .then(function(response) {
      accountsObject.BugCrowd_Tested = true;
      if (response.status === 200) {
        if (response.data.Platforms[0].Web_Driver_Wait_Until_Timed_Out === false) {
          accountsObject.Total_Points_Final_Value += response.data.Platforms[0].Points;
          accountsObject.BugCrowd = response.data.Platforms[0].Has_Account;
          console.log(accountsObject);

          dispatch({ type: STORE_ACCOUNTS, payload: accountsObject });
        } else {
          Alert.alert(
            'BugCrowd Timed Out!',
            'Your response took to much time to appear. Please try again!' + error,
            [
              {
                text: 'Ok',
                onPress: () => {
                  // checkPlatforms(
                  //   userObject.userEmail,
                  //   userObject.userStackOverflowDisplayName,
                  //   userObject.userBearerToken,
                  //   'BugCrowd'
                  // );
                }
              },
              { text: 'Cancel', onPress: () => {} }
            ]
          );
        }
      }
    })
    .catch(error => {
      accountsObject.BugCrowd_Tested = true;
      console.log(error);
    });
};

const checkCodecademyAccount = dispatch => {
  requestParams.Email = userObject.userEmail;
  requestHeaders.Authorization = userObject.userBearerToken;

  axios({
    method: 'POST',
    url: 'https://codersfootprintapp.azurewebsites.net/api/Platforms/Codecademy/',
    timeout: 180000,
    data: requestParams,
    headers: requestHeaders
  })
    .then(function(response) {
      accountsObject.Codecademy_Tested = true;
      if (response.status === 200) {
        if (response.data.Platforms[0].Web_Driver_Wait_Until_Timed_Out === false) {
          accountsObject.Total_Points_Final_Value += response.data.Platforms[0].Points;
          accountsObject.Codecademy = response.data.Platforms[0].Has_Account;
          console.log(accountsObject);

          dispatch({ type: STORE_ACCOUNTS, payload: accountsObject });
        } else {
          Alert.alert(
            'Codecademy Timed Out!',
            'Your response took to much time to appear. Please try again!' + error,
            [
              {
                text: 'Ok',
                onPress: () => {
                  // checkPlatforms(
                  //   userObject.userEmail,
                  //   userObject.userStackOverflowDisplayName,
                  //   userObject.userBearerToken,
                  //   'Apple'
                  // );
                }
              },
              { text: 'Cancel', onPress: () => {} }
            ]
          );
        }
      }
    })
    .catch(error => {
      accountsObject.Codecademy_Tested = true;
      console.log(error);
    });
};

const clearAccounts = dispatch => {
  accountsObject.GitHub = false;
  accountsObject.GitHub_Followers = 0;
  accountsObject.GitHub_Organizations = 0;
  accountsObject.GitHub_Repositories = 0;
  accountsObject.GitHub_Tested = false;
  accountsObject.GitHub_Username = '';
  accountsObject.GitHub_Subscriptions = 0;
  accountsObject.BugCrowd = false;
  accountsObject.BugCrowd_Tested = false;
  accountsObject.Google = false;
  accountsObject.Google_Tested = false;
  accountsObject.XDA = false;
  accountsObject.XDA_Tested = false;
  accountsObject.Total_Points_Final_Value = 0;
  accountsObject.Nickname = '';
  accountsObject.Microsoft = false;
  accountsObject.Microsoft_Tested = false;
  accountsObject.StackOverflow = false;
  accountsObject.StackOverflow_Answers = 0;
  accountsObject.StackOverflow_Comments = 0;
  accountsObject.StackOverflow_Questions = 0;
  accountsObject.StackOverflow_Tested = false;
  accountsObject.DZone = false;
  accountsObject.DZone_Tested = false;
  accountsObject.Codecademy = false;
  accountsObject.Codecademy_Tested = false;

  dispatch({ type: CLEAR_ACCOUNTS });
};

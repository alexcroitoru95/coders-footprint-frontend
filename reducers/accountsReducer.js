import { STORE_ACCOUNTS, CLEAR_ACCOUNTS } from '../actions/authenticationTypes';

const INITIAL_STATE = {
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
  Codecademy: false,
  Codecademy_Tested: false,
  BugCrowd: false,
  BugCrowd_Tested: false,
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

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case STORE_ACCOUNTS:
      return Object.assign({}, state, action.payload);
    case CLEAR_ACCOUNTS:
      return INITIAL_STATE;
    default:
      return state;
  }
};

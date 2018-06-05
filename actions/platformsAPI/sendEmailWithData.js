import axios from 'axios';
import { EMAIL_SENT } from '../authenticationTypes';

const requestHeaders = {
  Authorization: ''
};

const requestParams = {
  Email: ''
};

const emailSentObject = {
  emailSent: false
};

export const sendEmailWithData = user => dispatch => {
  requestParams.Email = user.Email;
  requestHeaders.Authorization = user.BearerToken;

  axios({
    method: 'POST',
    url: 'https://codersfootprintapp.azurewebsites.net/api/GetUserData/SendEmail/',
    timeout: 180000,
    data: requestParams,
    headers: requestHeaders
  })
    .then(function(response) {
      if (response.status === 200) {
        emailSentObject.emailSent = true;
        dispatch({ type: EMAIL_SENT, payload: emailSentObject });
      } else {
        emailSentObject.emailSent = false;
        dispatch({ type: EMAIL_SENT, payload: emailSentObject });
      }
    })
    .catch(error => {
      emailSentObject.emailSent = false;
      console.log(error);
      dispatch({ type: EMAIL_SENT, payload: emailSentObject });
    });
};

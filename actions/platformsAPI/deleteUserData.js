import axios from 'axios';
import { DATA_DELETED } from '../authenticationTypes';

const requestHeaders = {
  Authorization: ''
};

const requestParams = {
  Email: ''
};

const dataDeletedObject = {
  dataDeleted: false
};

export const deleteUserData = user => dispatch => {
  requestParams.Email = user.Email;
  requestHeaders.Authorization = user.BearerToken;

  axios({
    method: 'POST',
    url: 'https://codersfootprintapp.azurewebsites.net/api/DeleteUserData/DeleteUser/',
    timeout: 180000,
    data: requestParams,
    headers: requestHeaders
  })
    .then(function(response) {
      if (response.status === 200) {
        emailSentObject.emailSent = true;
        dispatch({ type: DATA_DELETED, payload: dataDeletedObject });
      } else {
        emailSentObject.emailSent = false;
        dispatch({ type: DATA_DELETED, payload: dataDeletedObject });
      }
    })
    .catch(error => {
      dataDeletedObject.dataDeleted = false;
      console.log(error);
      dispatch({ type: DATA_DELETED, payload: dataDeletedObject });
    });
};

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
      console.log(response.status);
      if (response.status === 200 || response.status === 204) {
        dataDeletedObject.dataDeleted = true;
        console.log(dataDeletedObject);
        dispatch({ type: DATA_DELETED, payload: dataDeletedObject });
      } else {
        dataDeletedObject.dataDeleted = false;
        console.log(dataDeletedObject);
        dispatch({ type: DATA_DELETED, payload: dataDeletedObject });
      }
    })
    .catch(error => {
      dataDeletedObject.dataDeleted = false;
      console.log(error);
      dispatch({ type: DATA_DELETED, payload: dataDeletedObject });
    });
};

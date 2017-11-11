import {
  GET_API_DATA,
  GET_API_DATA_LOADED,
  GET_API_DATA_ERROR,
} from './constants';

import fetchData from './utils';

window.IS_SAGA_MIDDLEWARE = true;

let getAPIData;

const getAPIDataLoaded = (data) => ({
  type: GET_API_DATA_LOADED,
  data,
});

const getAPIDataError = (error) => ({
  type: GET_API_DATA_ERROR,
  error,
});

if (window.IS_SAGA_MIDDLEWARE) {
  getAPIData = (options) => ({
    type: GET_API_DATA,
    params: options.params
  });
} else {
  getAPIData = (options) => {
    return (dispatch) => {
      dispatch({
        type: GET_API_DATA
      });
      fetchData(options.params).then(({result}) => {
        dispatch(getAPIDataLoaded(result.response));
      }, ({error}) => {
        getAPIDataError(error);
      });
    }
  };
}

export {getAPIData, getAPIDataLoaded, getAPIDataError};

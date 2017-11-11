import { takeLatest, takeEvery, call, put, select } from 'redux-saga/effects';

import { getAPIDataLoaded, getAPIDataError } from './actions';

import {
  GET_API_DATA,
} from './constants';

const fetchData = (url, options) => {
  const fetchRequest = new Request(url, options);
  return fetch(fetchRequest)
    .then((response) => (
      response.json().then((result) => ({ result }))
    ))
    .catch((error) => ({ error }));
};

const baseRoute =  'http://localhost:3456';

function* getApiData({data}) {
  let state = yield select();
  console.log(state);
  const { result, error } = yield call(fetchData, `${baseRoute}/api/${data}`, { method: 'get' });
  if (error) {
    yield put(getAPIDataError(error));
  }
  yield put(getAPIDataLoaded(result.response));
  state = yield select();
  console.log(state);
}

export function* apiData() {
  yield takeLatest(GET_API_DATA, getApiData);
}


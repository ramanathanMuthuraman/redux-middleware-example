import { takeLatest, call, put, select } from 'redux-saga/effects';
import fetchData from './utils';
import { getAPIDataLoaded, getAPIDataError } from './actions';

import {
  GET_API_DATA,
} from './constants';

function* getApiData({params}) {
  let state = yield select();
  console.log(state);
  const { result, error } = yield call(fetchData, params);
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


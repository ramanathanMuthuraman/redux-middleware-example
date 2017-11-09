import { fork, all } from 'redux-saga/effects';

import {apiData} from './containers/App/sagas';

export default function* rootSaga() {
  yield all([
    fork(apiData)
  ])
}

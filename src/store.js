import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunkMiddleware from 'redux-thunk';

import createGlobalReducer from './global-reducer';
import rootSaga from './global-sagas';

const sagaMiddleware = createSagaMiddleware();

const middlewares = window.IS_SAGA_MIDDLEWARE ? [sagaMiddleware] : [thunkMiddleware];

const store = createStore(
  createGlobalReducer(),
  compose(
    applyMiddleware(...middlewares),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

window.IS_SAGA_MIDDLEWARE && sagaMiddleware.run(rootSaga);

export default store;

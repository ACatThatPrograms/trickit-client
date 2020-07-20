// eslint-disable-next-line no-unused-vars
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers/reducers.js';
import thunk from 'redux-thunk';

// const composer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// composer(applyMiddleware(thunk))

export default createStore(
  rootReducer,
  applyMiddleware(thunk)
);

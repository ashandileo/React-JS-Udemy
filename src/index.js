import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import counterReducer from './store/reducers/counter';
import resultsReducer from './store/reducers/results';

const rootReducer = combineReducers({
  ctr: counterReducer,
  res: resultsReducer
});

// middleware
const logger = store => {
  return next => {
    return action => {
      console.log('[Middleware] Dispatching', action);
      const result = next(action);
      console.log('[Middleware next state]', store.getState());
      return result
    }
  }
}

const store = createStore(rootReducer, applyMiddleware(logger));

const app = (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
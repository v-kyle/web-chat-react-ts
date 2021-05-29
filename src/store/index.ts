import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import authReducer from './authReducer';

const rootStore = combineReducers({
  auth: authReducer,
});

const store = createStore(rootStore, composeWithDevTools());

export default store;

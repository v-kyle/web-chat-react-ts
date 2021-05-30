import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { throttle } from 'lodash';
import authReducer from './authReducer';
import pageReducer from './pageReducer';
import { loadState, saveState } from '../util/stateFromStorage';

const twoSec = 2000;

const persistedState = loadState();

const rootStore = combineReducers({
  auth: authReducer,
  page: pageReducer,
});

const store = createStore(rootStore, persistedState, composeWithDevTools(applyMiddleware(thunk)));
store.subscribe(throttle(() => {
  saveState(store.getState());
}, twoSec));

export type RootState = ReturnType<typeof rootStore>;
export default store;

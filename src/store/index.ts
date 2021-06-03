import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { throttle } from 'lodash';
import authReducer from './authReducer';
import pageReducer from './pageReducer';
import currentChatReducer from './currentChatReducer';
import backdropReducer from './backdropReducer';
import { loadState, saveState } from '../util/stateFromStorage';
import errorReducer from './errorReducer';
import config from '../config';

const persistedState = loadState();

const rootStore = combineReducers({
  auth: authReducer,
  page: pageReducer,
  errorR: errorReducer,
  currentChat: currentChatReducer,
  backdrop: backdropReducer,
});

const store = createStore(rootStore, persistedState, composeWithDevTools(applyMiddleware(thunk)));
store.subscribe(throttle(() => {
  const state = store.getState();
  saveState({
    auth: state.auth,
    page: state.page,
    currentChat: state.currentChat,
  });
}, config.updateLocalStorageRate));

export type RootState = ReturnType<typeof rootStore>;
export default store;

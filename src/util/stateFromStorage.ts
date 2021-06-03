import { RootState } from '../store';

const localStorageKey = 'web-chat-state';

export const loadState = (): RootState | undefined => {
  try {
    const serializedState = localStorage.getItem(localStorageKey);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state: Pick<RootState, 'auth' | 'page' | 'currentChat'>): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(localStorageKey, serializedState);
  } catch {
    console.log('Save state error!');
  }
};

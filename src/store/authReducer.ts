import { Action } from 'redux';
import { User } from '../models/User';
import { auth } from '../api/auth';

interface IAuthState {
  token: string | null;
  user: User | null;
  isLogged: boolean;
}

const defaultAuthState: IAuthState = {
  token: null,
  user: null,
  isLogged: false,
};

const authReducer = (state = defaultAuthState, action: Action): IAuthState => {
  switch (action.type) {
    case 'AUTH':
      return { ...state };
    case 'LOGOUT':
      return { ...state };
    case 'REG':
      return { ...state };
    default:
      return state;
  }
};

export default authReducer;

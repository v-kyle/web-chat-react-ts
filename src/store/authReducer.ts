import { User } from '../models/User';

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

enum AuthActionsTypes {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT'
}

interface LoginAction {
  type: AuthActionsTypes.LOGIN;
  payload: User & {
    token: string;
  };
}

interface LogoutAction {
  type: AuthActionsTypes.LOGOUT;
}

const authReducer = (state = defaultAuthState, action: LoginAction | LogoutAction): IAuthState => {
  switch (action.type) {
    case AuthActionsTypes.LOGIN:
      return {
        ...state,
        ...{
          token: action.payload.token,
          user: {
            login: action.payload.login,
            photo: action.payload.photo,
            name: action.payload.name,
            chats: action.payload.chats || [],
            id: action.payload.id,
          },
          isLogged: true,
        },
      };
    case AuthActionsTypes.LOGOUT:
      return { ...state, ...{ token: null, user: null, isLogged: false } };
    default:
      return state;
  }
};

export const loginAction = (payload: LoginAction['payload']): LoginAction => ({ type: AuthActionsTypes.LOGIN, payload });
export const logoutAction = (): LogoutAction => ({ type: AuthActionsTypes.LOGOUT });

export default authReducer;

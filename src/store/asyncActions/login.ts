import { Dispatch } from 'redux';
import { auth } from '../../api/auth';
import { loginAction } from '../authReducer';

type loginType = (l: string, pass: string) => (dispatch: Dispatch) => Promise<void>;

const loginAsyncAction: loginType = (l, pass) => async (dispatch): Promise<void> => {
  const data = await auth(l, pass);
  dispatch(loginAction(data));
};

export default loginAsyncAction;

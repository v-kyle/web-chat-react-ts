import { Dispatch } from 'redux';
import { auth } from '../../api/auth';
import { loginAction } from '../authReducer';
import { setErrorAction } from '../errorReducer';

type loginType = (l: string, pass: string) => (dispatch: Dispatch) => Promise<void>;

const loginAsyncAction: loginType = (l, pass) => async (dispatch): Promise<void> => {
  try {
    const data = await auth(l, pass);
    dispatch(loginAction(data));
  } catch (e) {
    dispatch(setErrorAction(e.toString()));
  }
};

export default loginAsyncAction;

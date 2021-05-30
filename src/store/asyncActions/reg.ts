import { Dispatch } from 'redux';
import { registration, RegParams } from '../../api/auth';
import { loginAction } from '../authReducer';
import { setErrorAction } from '../errorReducer';

type regType = (regParams: RegParams) => (dispatch: Dispatch) => Promise<void>;

const reg: regType = (regParams) => async (dispatch): Promise<void> => {
  try {
    const data = await registration(regParams);
    dispatch(loginAction(data));
  } catch (e) {
    dispatch(setErrorAction(e.toString()));
  }
};

export default reg;

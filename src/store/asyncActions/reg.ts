import { Dispatch } from 'redux';
import { registration, RegParams } from '../../api/auth';
import { loginAction } from '../authReducer';

type regType = (regParams: RegParams) => (dispatch: Dispatch) => Promise<void>;

const reg: regType = (regParams) => async (dispatch): Promise<void> => {
  const data = await registration(regParams);
  dispatch(loginAction(data));
};

export default reg;

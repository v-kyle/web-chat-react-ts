interface IErrorReducer {
  value: null | string,
}

const defaultState: IErrorReducer = {
  value: null,
};

enum ErrorActionsTypes {
  SET_ERROR = 'SET_ERROR',
  CLEAR_ERROR = 'CLEAR_ERROR',
}

interface SetErrorAction {
  type: ErrorActionsTypes.SET_ERROR;
  payload: string;
}

interface ClearErrorAction {
  type: ErrorActionsTypes.CLEAR_ERROR;
}
const errorReducer = (state = defaultState,
  action: SetErrorAction | ClearErrorAction): IErrorReducer => {
  switch (action.type) {
    case ErrorActionsTypes.SET_ERROR:
      return { ...state, ...{ value: action.payload } };
    case ErrorActionsTypes.CLEAR_ERROR:
      return { ...state, ...{ value: null } };
    default:
      return { ...state };
  }
};

export const setErrorAction = (payload: SetErrorAction['payload']): SetErrorAction => (
  {
    type: ErrorActionsTypes.SET_ERROR,
    payload,
  }
);
export const clearErrorAction = (): ClearErrorAction => ({ type: ErrorActionsTypes.CLEAR_ERROR });
export default errorReducer;

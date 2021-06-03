const defaultState = false as const;

enum BackdropActionsTypes {
  OPEN = 'OPEN',
  CLOSE = 'CLOSE',
}

interface OpenBackdropAction {
  type: BackdropActionsTypes.OPEN,
}

interface CloseBackdropAction {
  type: BackdropActionsTypes.CLOSE,
}

const backdropReducer = (
  state = defaultState, action: OpenBackdropAction | CloseBackdropAction,
): boolean => {
  switch (action.type) {
    case BackdropActionsTypes.OPEN:
      return true;
    case BackdropActionsTypes.CLOSE:
      return false;
    default:
      return state;
  }
};

export const openBackdropAction = (): OpenBackdropAction => ({ type: BackdropActionsTypes.OPEN });
export const closeBackdropAction = (): CloseBackdropAction => (
  { type: BackdropActionsTypes.CLOSE }
);

export default backdropReducer;

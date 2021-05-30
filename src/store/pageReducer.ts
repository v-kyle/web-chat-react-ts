export enum CurrentPage {
  LOGIN = 'LOGIN',
  REG = 'REG',
  MAIN = 'MAIN'
}

interface IPageState {
  page: CurrentPage;
}

const defaultState: IPageState = {
  page: CurrentPage.LOGIN,
};

enum PageActionsTypes {
  SET_PAGE = 'SET_PAGE',
}

interface SetPageAction {
  type: PageActionsTypes.SET_PAGE;
  payload: CurrentPage;
}

const pageReducer = (state = defaultState, action: SetPageAction): IPageState => {
  switch (action.type) {
    case PageActionsTypes.SET_PAGE:
      return { ...state, page: action.payload };
    default:
      return { ...state };
  }
};

export const pageAction = (payload: CurrentPage): SetPageAction => (
  {
    type: PageActionsTypes.SET_PAGE,
    payload,
  }
);

export default pageReducer;

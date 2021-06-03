const defaultState = '';

const SET_CURRENT_CHAT = 'SET_CURRENT_CHAT' as const;

interface SetCurrentChatAction {
  type: typeof SET_CURRENT_CHAT;
  payload: string;
}

const currentChatReducer = (state = defaultState, action: SetCurrentChatAction): string => {
  switch (action.type) {
    case 'SET_CURRENT_CHAT':
      return action.payload;
    default:
      return state;
  }
};

export const setChatAction = (payload: string): SetCurrentChatAction => (
  {
    type: SET_CURRENT_CHAT,
    payload,
  }
);

export default currentChatReducer;

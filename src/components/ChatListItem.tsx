import React from 'react';
import { Button, IconButton } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import { red } from '@material-ui/core/colors';
import { setChatAction } from '../store/currentChatReducer';
import useTypedSelector from '../hooks/useTypedSelector';
import { leaveChat } from '../api/chat';

const ChatListItem: React.FC<{chatName: string, onChatsEdited: (chats: Array<string>) => void}> = (
  { chatName, onChatsEdited },
) => {
  const dispatch = useDispatch();
  const selectedChatName = useTypedSelector((state) => state.currentChat);
  const width = '90%';

  function isSelectedChat() {
    return chatName === selectedChatName;
  }

  function setCurrentChat() {
    dispatch(setChatAction(chatName));
  }

  async function leave() {
    const data = await leaveChat(chatName);
    if (selectedChatName === chatName) {
      dispatch(setChatAction(''));
    }
    onChatsEdited(data.chats);
  }

  return (
    <div
      style={
        {
          boxSizing: 'border-box',
          width,
          border: '1px solid rgba(50, 50, 255, .5)',
          margin: '10px 0',
          display: 'flex',
        }
      }
    >
      <Button
        variant="text"
        onClick={setCurrentChat}
        style={
          {
            flexGrow: 1,
            fontWeight: isSelectedChat() ? 'bold' : 'normal',
            fontSize: isSelectedChat() ? '1.25rem' : '1rem',
            textTransform: 'none',
          }
        }
      >
        {chatName}
      </Button>
      <IconButton onClick={leave} aria-label="delete">
        <DeleteIcon style={{ color: red[500] }} />
      </IconButton>
    </div>
  );
};

export default ChatListItem;

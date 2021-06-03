import React from 'react';
import { Button, useMediaQuery, IconButton } from '@material-ui/core';
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
  const matchesNotXL = useMediaQuery('(max-width: 1000px)');
  const matchesMobile = useMediaQuery('(max-width: 500px)');
  const selectedChatName = useTypedSelector((state) => state.currentChat);
  let width = '500px';

  function isSelectedChat() {
    return chatName === selectedChatName;
  }

  if (matchesNotXL) {
    width = '300px';
    if (matchesMobile) {
      width = '150px';
    }
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
          width,
          border: '1px solid rgba(50, 50, 255, .5)',
          margin: '5px 15px 5px 5px',
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

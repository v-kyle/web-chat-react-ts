import React from 'react';
import { Button, useMediaQuery } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { setChatAction } from '../store/currentChatReducer';
import useTypedSelector from '../hooks/useTypedSelector';

const ChatListItem: React.FC<{chatName: string}> = (
  { chatName },
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

  return (
    <Button
      variant="text"
      onClick={setCurrentChat}
      style={
        {
          display: 'block',
          fontWeight: isSelectedChat() ? 'bold' : 'normal',
          width,
          border: '1px solid rgba(50, 50, 255, .5)',
          margin: '5px 15px 5px 5px',
          fontSize: isSelectedChat() ? '1.25rem' : '1rem',
          textTransform: 'none',
        }
      }
    >
      {chatName}
    </Button>
  );
};

export default ChatListItem;

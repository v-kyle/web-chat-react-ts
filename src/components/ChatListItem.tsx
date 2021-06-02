import React from 'react';
import { Button, useMediaQuery } from '@material-ui/core';

const ChatListItem: React.FC<{chatName: string, onChatNameSelect: (chatName: string) => void}> = (
  { chatName, onChatNameSelect },
) => {
  const matchesNotXL = useMediaQuery('(max-width: 1000px)');
  const matchesMobile = useMediaQuery('(max-width: 500px)');
  let width = '500px';

  if (matchesNotXL) {
    width = '300px';
    if (matchesMobile) {
      width = '150px';
    }
  }

  return (
    <Button
      variant="text"
      onClick={() => onChatNameSelect(chatName)}
      style={
        {
          display: 'block',
          width,
          border: '1px solid rgba(50, 50, 255, .5)',
          margin: '5px 15px 5px 5px',
          fontSize: '1.25rem',
          textTransform: 'none',
        }
      }
    >
      {chatName}
    </Button>
  );
};

export default ChatListItem;

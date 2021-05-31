import React from 'react';
import { Button } from '@material-ui/core';

const ChatListItem: React.FC<{chatName: string}> = ({ chatName }) => (
  <Button
    variant="text"
    style={
    {
      width: '75%',
      border: '1px solid rgba(50, 50, 255, .5)',
      margin: '5px 15px 5px 5px',
      fontSize: '1.25rem',
      textTransform: 'none',
    }
  }
  >
    { chatName }
  </Button>
);

export default ChatListItem;

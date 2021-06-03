import React from 'react';
import { makeStyles } from '@material-ui/core';
import ChatListItem from './ChatListItem';

const useStyles = makeStyles(() => ({
  chatsHeader: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '1.1rem',
  },
}));

const Chats: React.FC<{ chats: Array<string>, onChatsEdited: (chats: Array<string>) => void }> = (
  { chats, onChatsEdited },
) => {
  const classes = useStyles();
  return (
    <div style={{
      padding: '20px 0',
      flexGrow: 1,
      maxHeight: '80vh',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
    >
      <div className={classes.chatsHeader}>Your chats:</div>
      <br />
      {chats.map((chatName) => (
        <ChatListItem
          key={chatName}
          onChatsEdited={onChatsEdited}
          chatName={chatName}
        />
      ))}
    </div>
  );
};

export default Chats;

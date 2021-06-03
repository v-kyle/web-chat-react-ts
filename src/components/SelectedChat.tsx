import React, {
  useEffect, useLayoutEffect, useRef, useState,
} from 'react';
import { Button, makeStyles, TextField } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import { Chat } from '../models/Chat';
import { getChat, sendMessage } from '../api/chat';
import config from '../config';
import useTypedSelector from '../hooks/useTypedSelector';
import MessageItem from './MessageItem';

const useStyles = makeStyles(() => ({
  noChat: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    height: '100%',
  },
  chatContainer: {
    height: '100%',
    display: 'grid',
    gridTemplateRows: 'auto 75vh auto',
  },
  chatHeader: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '1.25rem',
  },
  chatActions: {
    padding: '0 25px',
    display: 'grid',
    alignItems: 'center',
    gridGap: '50px',
    alignContent: 'center',
    height: '100%',
    gridTemplateColumns: '4fr 1fr',
  },
}));

const SelectedChat: React.FC = () => {
  const classes = useStyles();
  const [newMessage, setNewMessage] = useState('');
  const bottomMessage = useRef<HTMLElement>();
  const [chat, setChat] = useState(null as Chat | null);
  const selectedChatName = useTypedSelector((state) => state.currentChat);

  useLayoutEffect(() => {
    async function getSelectedChat() {
      if (selectedChatName) {
        const res = await getChat(selectedChatName);
        if (res.chat.name === selectedChatName) {
          setChat(res.chat);
        }
      } else {
        setChat(null);
      }
    }

    const intervalId = setInterval(async () => {
      await getSelectedChat();
    }, config.selectedChatUpdateRate);

    return () => {
      clearInterval(intervalId);
    };
  }, [selectedChatName]);

  function haveMessages() {
    return chat && chat.message.length;
  }

  function scrollDown() {
    if (bottomMessage && bottomMessage.current) {
      const scroll = bottomMessage.current.scrollHeight - bottomMessage.current.clientHeight;
      bottomMessage.current.scrollTo(0, scroll);
    }
  }

  async function handleSendMessage() {
    if (chat) {
      await sendMessage(chat.name, newMessage);
      setNewMessage('');
    }
  }

  useEffect(() => {
    scrollDown();
  }, [chat?.message.length]);

  return (
    <div style={{ flexGrow: 2, background: blue[50], borderLeft: '1px solid navy' }}>
      {!chat && <div className={classes.noChat}>Create or select chat</div>}
      {chat && (
      <div className={classes.chatContainer}>
        <header className={classes.chatHeader}>{chat.name}</header>
        <main
          style={{ overflow: 'auto', paddingLeft: '25px', paddingRight: '25px' }}
          ref={(instance) => {
            if (instance) {
              bottomMessage.current = instance;
            }
          }}
        >
          {haveMessages() ? (chat.message.map(
            (message) => <MessageItem message={message} key={message.id} />,
          )) : <div>No messages. Write first!</div> }
        </main>
        <footer className={classes.chatActions}>
          <TextField
            margin="normal"
            variant="outlined"
            type="text"
            style={{ background: 'white' }}
            placeholder="Type here"
            label="message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <Button
            color="primary"
            style={{ background: blue[100], textTransform: 'none' }}
            variant="text"
            onClick={handleSendMessage}
          >
            Send message
          </Button>
        </footer>
      </div>
      )}
    </div>
  );
};

export default SelectedChat;

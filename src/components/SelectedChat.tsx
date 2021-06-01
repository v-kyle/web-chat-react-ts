import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import { Chat } from '../models/Chat';
import { sendMessage } from '../api/chat';

const SelectedChat: React.FC<{chat: Chat | null}> = ({ chat }) => {
  const [newMessage, setNewMessage] = useState('');

  async function handleSendMessage() {
    if (chat) {
      await sendMessage(chat.name, newMessage);
    }
  }

  return (
    <div style={{ flexGrow: 2, background: blue[50] }}>
      {!chat && <div>Create or select chat</div>}
      {chat && chat.message.length === 0 && <div>No messages. Write first!</div>}
      {chat && chat.message && (chat.message.map((message) => (
        <div key={message.id} style={{ border: '1px solid grey' }}>
          Author:
          <br />
          {message.author.name}
          <br />
          Text:
          <br />
          {message.text}
          <br />
          Time:
          <br />
          {message.time}
        </div>
      )))}
      {chat && (
        <div>
          <TextField
            label="message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          {' '}
          <Button onClick={handleSendMessage}>Send message</Button>
        </div>
      )}
    </div>
  );
};

export default SelectedChat;

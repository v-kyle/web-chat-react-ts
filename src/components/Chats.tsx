import React from 'react';
import ChatListItem from './ChatListItem';

const Chats: React.FC<{ chats: Array<string> }> = ({ chats }) => (
  <div style={{ padding: '20px 0' }}>
    Chats:
    <br />
    {chats.map((chatName) => <ChatListItem chatName={chatName} />)}
  </div>
);

export default Chats;

import React from 'react';
import ChatListItem from './ChatListItem';

const Chats: React.FC<{ chats: Array<string> }> = (
  { chats },
) => (
  <div style={{ padding: '20px 0', flexGrow: 1, borderRight: '1px solid navy' }}>
    Chats:
    <br />
    {chats.map((chatName) => (
      <ChatListItem
        key={chatName}
        chatName={chatName}
      />
    ))}
  </div>
);

export default Chats;

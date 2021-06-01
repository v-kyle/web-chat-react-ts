import React from 'react';
import ChatListItem from './ChatListItem';

const Chats: React.FC<{ chats: Array<string>, handleChatNameSelect: (
  chatName: string
  ) => void }> = (
    { chats, handleChatNameSelect },
  ) => (
    <div style={{ padding: '20px 0' }}>
      Chats:
      <br />
      {chats.map((chatName) => (
        <ChatListItem
          key={chatName}
          chatName={chatName}
          onChatNameSelect={handleChatNameSelect}
        />
      ))}
    </div>
  );

export default Chats;

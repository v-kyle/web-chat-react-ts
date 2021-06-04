import http from './http';
import { Chat } from '../models/Chat';

import store from '../store';
import { Message } from '../models/Message';
import { User } from '../models/User';

interface ChatResponse {
  chat: Chat & {users: Array<User>}
}

async function createChat(chatName: string): Promise<ChatResponse> {
  const { token } = store.getState().auth;
  const res = await http.post<ChatResponse>('/chat/start', {
    chatName,
  }, {
    headers: {
      token,
    },
  });
  return res.data;
}

async function getChat(chatName: string): Promise<ChatResponse> {
  const { token } = store.getState().auth;
  const res = await http.post<ChatResponse>('/chat', {
    chatName,
  }, {
    headers: {
      token,
    },
  });
  return res.data;
}

interface ChatsResponse {
  chats: Array<string>
}

async function getAllChats(): Promise<ChatsResponse> {
  const { token } = store.getState().auth;
  const res = await http.get<ChatsResponse>('/chats', {
    headers: {
      token,
    },
  });
  return res.data;
}

async function sendMessage(chatName: string, messageText: string): Promise<Message> {
  const { token } = store.getState().auth;
  const res = await http.post<Message>('/chat/send', { // TODO: принимать ответ
    chatName,
    text: messageText,
  }, {
    headers: {
      token,
    },
  });

  return res.data;
}

async function leaveChat(chatName: string): Promise<ChatsResponse> {
  const { token } = store.getState().auth;
  const res = await http.post<ChatsResponse>('/chat/leave', {
    chatName,
  }, {
    headers: {
      token,
    },
  });

  return res.data;
}

async function editMessage(
  chatName: string, messageId: number, text: string,
): Promise<ChatResponse> {
  const { token } = store.getState().auth;
  const res = await http.post<ChatResponse>('/chat/edit', {
    chatName,
    messageId,
    text,
  }, {
    headers: {
      token,
    },
  });

  return res.data;
}

export {
  createChat, getChat, getAllChats, sendMessage, leaveChat, editMessage,
};

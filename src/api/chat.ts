import http from './http';
import { Chat } from '../models/Chat';

import store from '../store';

interface ChatResponse {
  chat: Chat
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

async function sendMessage(chatName: string, messageText: string): Promise<void> {
  const { token } = store.getState().auth;
  await http.post('/chat/send', {
    chatName,
    text: messageText,
  }, {
    headers: {
      token,
    },
  });
}

export {
  createChat, getChat, getAllChats, sendMessage,
};

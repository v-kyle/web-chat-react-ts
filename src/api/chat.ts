import http from './http';
import { Chat } from '../models/Chat';

import store from '../store';

interface ChatResponse {
  chat: Chat
}

async function createChat(chatName: string): Promise<ChatResponse> {
  const { token } = store.getState().auth;
  const res = await http.post<Promise<ChatResponse>>('/chat/start', {
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
  const res = await http.post<Promise<ChatResponse>>('/chat', {
    chatName,
  }, {
    headers: {
      token,
    },
  });
  return res.data;
}

type ChatsResponse = Array<string>;

async function getAllChats(): Promise<ChatsResponse> {
  const { token } = store.getState().auth;
  const res = await http.get<Promise<ChatsResponse>>('/chats', {
    headers: {
      token,
    },
  });
  return res.data;
}

export { createChat, getChat, getAllChats };

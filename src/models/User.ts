import { Chat } from './Chat';

export interface User {
  id: number;
  name: string;
  login: string;
  photo: string;
  chats: Array<Chat>;
}

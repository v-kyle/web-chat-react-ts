import { uuid } from './uuid';
import { Chat } from './Chat';

export interface User {
  id: uuid;
  name: string;
  login: string;
  photo: string;
  chats: Array<Chat>;
}

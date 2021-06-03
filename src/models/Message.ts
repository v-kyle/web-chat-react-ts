import { User } from './User';

export interface Message {
  id: number;
  author: User;
  text: string;
  time: Date;
}

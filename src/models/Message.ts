import { uuid } from './uuid';
import { User } from './User';

export interface Message {
  id: uuid;
  author: User;
  text: string;
  time: Date;
}

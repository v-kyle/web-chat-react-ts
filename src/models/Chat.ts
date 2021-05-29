import { uuid } from './uuid';
import { Message } from './Message';

export interface Chat {
  id: uuid;
  name: string;
  messages: Message[];
}

import http from './http';
import { User } from '../models/User';

type AuthResponse = User & {token: string};

async function auth(login: string, password: string): Promise<AuthResponse> {
  const res = await http.post<AuthResponse>('/auth', {
    login,
    password,
  });

  return res.data;
}

interface RegParam {
  login: string;
  name: string;
  photo: string;
  password: string;
}

async function registration(param: RegParam): Promise<AuthResponse> {
  const res = await http.post<AuthResponse>('/registration', param);

  return res.data;
}

export {
  auth,
  registration,
};

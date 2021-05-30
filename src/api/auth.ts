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

export interface RegParams {
  login: string;
  name: string;
  photo: string;
  password: string;
}

async function registration(param: RegParams): Promise<AuthResponse> {
  const res = await http.post<AuthResponse>('/reg', param);

  return res.data;
}

export {
  auth,
  registration,
};

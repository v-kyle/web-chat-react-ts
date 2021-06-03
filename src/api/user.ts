import http from './http';
import { User } from '../models/User';
import store from '../store';

async function editProfile(params: {name?: string, photo?: string}): Promise<User> {
  const { token } = store.getState().auth;
  const res = await http.post('/profile/edit', {
    name: params.name,
    photo: params.photo,
  }, {
    headers: {
      token,
    },
  });

  return res.data;
}

async function getProfile(id: number): Promise<User> {
  const { token } = store.getState().auth;
  const res = await http.get<User>(`/profile/${id}`, {
    headers: {
      token,
    },
  });
  return res.data;
}

export {
  editProfile,
  getProfile,
};

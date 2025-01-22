import { api } from './api';

export interface User {
  id: number;
  username: string;
  avatar_url: string;
  registration_date: string;
  email?: string;
}

export const usersApi = {
  getCurrentUser: async (): Promise<User> => {
    return await api.get('/users/me');
  },

  getAllUsers: async (): Promise<User[]> => {
    return await api.get('/users');
  },

  updateProfile: async (data: FormData): Promise<User> => {
    return await api.put('/users/profile', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}; 


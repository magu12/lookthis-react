import { User } from './users';
import { api } from './api';

interface RegisterData {
  username: string;
  email: string;
  password: string;
  avatar?: File;
}

interface LoginData {
  email: string;
  password: string;
}

interface ResetPasswordData {
  email: string;
}

interface NewPasswordData {
  token: string;
  password: string;
}

export interface LoginResponse {
  token?: string;
  user: User;
}

export const authApi = {
  register: async (userData: RegisterData) => {
    const formData = new FormData();
    formData.append('username', userData.username);
    formData.append('email', userData.email);
    formData.append('password', userData.password);
    if (userData.avatar) {
      formData.append('avatar', userData.avatar);
    }

    const response = await api.post("/auth/register", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Store tokens if they're in the response
    if (response.accessToken) {
      localStorage.setItem('accessToken', response.accessToken);
    }
    if (response.refreshToken) {
      localStorage.setItem('refreshToken', response.refreshToken);
    }

    return response;
  },

  login: async (credentials: LoginData): Promise<LoginResponse> => {
    const response = await api.post("/auth/login", credentials);
    
    console.log('Response:', response);
    
    // Store tokens if they're in the response
    if (response.tokens.accessToken) {
      localStorage.setItem('accessToken', response.tokens.accessToken);
    }
    if (response.tokens.refreshToken) {
      localStorage.setItem('refreshToken', response.tokens.refreshToken);
    }

    return response;
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },

  resetPassword: async (data: ResetPasswordData) => {
    return api.post("/auth/reset-password", data);
  },

  setNewPassword: async (data: NewPasswordData) => {
    return api.post("/auth/new-password", data);
  },
}; 
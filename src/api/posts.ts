import { api } from './api';

export interface Post {
  id: number;
  user_id: number;
  title: string;
  short_description: string;
  content: string;
  publication_date: string;
  views: number;
  username: string;
  avatar_url: string;
}

export const postsApi = {
  getAllPosts: async (): Promise<Post[]> => {
    return api.get('/posts');
  },

  getPostById: async (id: number): Promise<Post> => {
    return api.get(`/posts/${id}`);
  },

  getUserPosts: async (userId: number): Promise<Post[]> => {
    return api.get(`/posts/user/${userId}`);
  }
};

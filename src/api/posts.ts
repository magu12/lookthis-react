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
  },

  uploadContentImage: async (image: File): Promise<string> => {
    const formData = new FormData();
    formData.append('content_image', image);

    return api.post('/posts/upload-content-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  createPost: async (
    title: string,
    shortDescription: string,
    content: string,
    featuredImage: File
  ): Promise<void> => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('short_description', shortDescription);
    formData.append('content', content);
    formData.append('featured_image', featuredImage);

    return api.post('/posts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
};

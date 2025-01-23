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
  featured_image_url: string;
}

export interface UploadResponse {
  url: string;
  originalName: string;
  timeElapsed: number;
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

  uploadContentImage: async (image: File): Promise<UploadResponse> => {
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
  },

  updatePost: async (
    id: number,
    title: string,
    shortDescription: string,
    content: string,
    featuredImage?: File
  ): Promise<void> => {
    let featuredImageUrl;
    
    // If there's a new image, upload it first
    if (featuredImage) {
      const formData = new FormData();
      formData.append('featured_image', featuredImage);
      const imageResponse = await api.post('/posts/upload-featured-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      featuredImageUrl = imageResponse.url;
    }

    // Then update the post with all the data
    return api.put(`/posts/${id}`, {
      title,
      short_description: shortDescription,
      content,
      ...(featuredImageUrl && { featured_image_url: featuredImageUrl })
    });
  }
};

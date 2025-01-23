import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAlert } from '../../contexts/AlertContext';
import { useAuth } from '../../contexts/AuthContext';
import { Post, postsApi } from '../../api/posts';
import { ArticleForm } from '../../Components/ArticleForm/ArticleForm';
import './ArticlePage.scss';

const ArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const { user } = useAuth();
  const [post, setPost] = useState<Post | null>(null);
  const isEditMode = Boolean(id);

  useEffect(() => {
    if (isEditMode) {
      const fetchPost = async () => {
        try {
          const postData = await postsApi.getPostById(parseInt(id!));

          if (postData.user_id !== user?.id) {
            showAlert('You can only edit your own articles', 'error');
            navigate('/');
            return;
          }

          setPost(postData);
        } catch (err) {
          showAlert(
            err instanceof Error ? err.message : 'Failed to load post',
            'error'
          );
          navigate('/');
        }
      };

      fetchPost();
    }
  }, [id, user?.id, showAlert, navigate, isEditMode]);

  const handleCreate = async (data: {
    title: string;
    shortDescription: string;
    content: string;
    featuredImage?: File;
  }) => {
    if (!data.featuredImage) {
      throw new Error('Main image is required');
    }

    await postsApi.createPost(
      data.title,
      data.shortDescription,
      data.content,
      data.featuredImage
    );

    showAlert('Article created successfully!', 'success');
    setTimeout(() => navigate('/'), 1500);
  };

  const handleUpdate = async (data: {
    title: string;
    shortDescription: string;
    content: string;
    featuredImage?: File;
  }) => {
    if (!id) return;

    await postsApi.updatePost(
      parseInt(id),
      data.title,
      data.shortDescription,
      data.content,
      data.featuredImage
    );

    showAlert('Article updated successfully!', 'success');
    setTimeout(() => navigate(`/post/${id}`), 1500);
  };

  if (isEditMode && !post) return null;

  return (
    <main className="article-page">
      <div className="wrap">
        <h1>{isEditMode ? 'Edit Article' : 'Create New Article'}</h1>
        <ArticleForm
          initialData={post || undefined}
          onSubmit={isEditMode ? handleUpdate : handleCreate}
          submitButtonText={isEditMode ? 'Update Article' : 'Create Article'}
          loadingButtonText={isEditMode ? 'Updating...' : 'Creating...'}
        />
      </div>
    </main>
  );
};

export default ArticlePage; 
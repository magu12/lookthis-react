import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Post as PostType } from '../../api/posts';
import { postsApi } from '../../api/posts';
import { useAlert } from '../../contexts/AlertContext';
import { formatDate } from '../../utils/formatDate';
import { useAuth } from '../../contexts/AuthContext';
import './Post.scss';

// Utility function for content decoding
const decodeContent = (content: string): string => {
  // Just return the content as is - no decoding needed
  // since we're receiving it as JSON and the server handles UTF-8
  return content;
};

export const Post: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { showAlert } = useAlert();
  const { user } = useAuth();
  const [post, setPost] = useState<PostType | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (!id) throw new Error('Post ID is required');
        const postData = await postsApi.getPostById(parseInt(id));
        setPost(postData);
      } catch (err) {
        showAlert(
          err instanceof Error ? err.message : 'Failed to load post',
          'error'
        );
      }
    };

    fetchPost();
  }, [id, showAlert]);

  if (!post) return null;

  return (
    <article className="post-page">
      <div className="wrap">
        <div className="post-header">
          <h1>{post.title}</h1>
          <img className="post-image" src={post.featured_image_url} alt={post.title} />
        </div>
        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: decodeContent(post.content) }}
        />
        <div className="post-footer">
          <div className="post-meta">
            <div className="author">
              <Link to={`/users/${post.user_id}`} className="author-info">
                <img
                  src={post.avatar_url}
                  alt={post.username}
                  className="author-avatar"
                />
                <span className="author-name">{post.username}</span>
              </Link>
              {user?.id === post.user_id && (
                <Link to={`/edit-post/${post.id}`} className="edit-button">
                  Edit article
                </Link>
              )}
            </div>
            <div className="post-stats">
              <span className="publication-date">
                {formatDate(post.publication_date)}
              </span>
              {' • '}
              <span className="views-count">
                {post.views} views
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}; 
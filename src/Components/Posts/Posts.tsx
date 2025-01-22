import { useEffect, useState } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Container } from '@mui/material';
import { Post, postsApi } from '../../api/posts';
import { Link } from 'react-router-dom';

export const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await postsApi.getAllPosts();
        setPosts(response);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className="posts">
      <div className="wrap">
        <Grid container spacing={4}>
          {posts.map((post) => (
            <Grid item key={post.id} xs={12} sm={6} md={3}>
              <Link to={`/posts/${post.id}`}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={post.avatar_url}
                  alt={post.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="h2" noWrap>
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                  }}>
                    {post.short_description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                    {new Date(post.publication_date).toLocaleDateString()}
                    {' • '}
                    {post.username}
                    {' • '}
                    👁 {post.views}
                  </Typography>
                </CardContent>
              </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </div>
    </section>
  );
};
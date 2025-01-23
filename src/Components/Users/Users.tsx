import { useEffect, useState } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Container } from '@mui/material';
import { User, usersApi } from '../../api/users';
import { Link } from 'react-router-dom';

export const Users = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await usersApi.getAllUsers();
        setUsers(response);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <section className="users">
      <div className="wrap">
        <Grid container spacing={4}>
          {users.map((user) => (
            <Grid item key={user.id} xs={12} sm={6} md={3}  className="card">
              <Link to={`/users/${user.id}`}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={user.avatar_url}
                  alt={user.username}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h2" align="center">
                    {user.username}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" align="center">
                    Joined: {new Date(user.registration_date).toLocaleDateString()}
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
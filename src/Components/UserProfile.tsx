import React from 'react';
import { GitHubUser } from '../types/GitHubUser';
import { Card, CardContent, Avatar, Typography, Box } from '@mui/material';

interface UserProfileProps {
    user: GitHubUser | null;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
    if (!user) return null;

    return (
        <Card 
            sx={{
                maxWidth: 345,
                mx: 'auto',
                mt: 4,
                boxShadow: 3,
                borderRadius: 2,
                textAlign: 'center',
                bgcolor: 'background.paper',
                color: 'text.primary',
            }}
        >
            <CardContent>
                <Avatar 
                    src={user.avatar_url} 
                    alt={`${user.login} avatar`} 
                    sx={{
                        width: 100,
                        height: 100,
                        mx: 'auto',
                        mb: 2,
                    }}
                />
                <Typography variant="h5" component="div" gutterBottom>
                    {user.login}
                </Typography>
                <Box sx={{ mt: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                        Followers: {user.followers}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Public Repositories: {user.public_repos}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default UserProfile;

import React, { useState } from 'react';
import axios from 'axios';
import UserProfile from './Components/UserProfile';
import RepositoryList from './Components/RepositoryList';
import { GitHubUser } from './types/GitHubUser';
import { GitHubRepo } from './types/GitHubRepo';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const App: React.FC = () => {
    const [username, setUsername] = useState('');
    const [user, setUser] = useState<GitHubUser | null>(null);
    const [repos, setRepos] = useState<GitHubRepo[]>([]);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        setError('');
        try {
            const userResponse = await axios.get<GitHubUser>(`https://api.github.com/users/${username}`);
            const reposResponse = await axios.get<GitHubRepo[]>(`https://api.github.com/users/${username}/repos`);

            setUser(userResponse.data);
            setRepos(reposResponse.data);
        } catch (err) {
            setError('User not found');
            setUser(null);
            setRepos([]);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                GitHub User Search
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <TextField
                    fullWidth
                    label="GitHub Username"
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter GitHub username"
                />
                <Button variant="contained" color="primary" onClick={handleSearch}>
                    Search
                </Button>
            </Box>

            {error && (
                <Typography color="error" sx={{ mb: 2 }}>
                    {error}
                </Typography>
            )}

            <UserProfile user={user} />
            <RepositoryList repositories={repos} />
        </Container>
    );
};

export default App;

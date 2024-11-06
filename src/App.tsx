import React, { useState } from 'react';
import axios from 'axios';
import UserProfile from './Components/UserProfile';
import RepositoryList from './Components/RepositoryList';
import { GitHubUser } from './types/GitHubUser';
import { GitHubRepo } from './types/GitHubRepo';
import { Container, TextField, Button, Typography, Box, CircularProgress } from '@mui/material';

const App: React.FC = () => {
    const [username, setUsername] = useState('');
    const [user, setUser] = useState<GitHubUser | null>(null);
    const [repos, setRepos] = useState<GitHubRepo[]>([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Add loading state

    const handleSearch = async () => {
        setError('');
        setLoading(true); // Set loading to true before making API call

        try {
            const userResponse = await axios.get<GitHubUser>(`https://api.github.com/users/${username}`);
            const reposResponse = await axios.get<GitHubRepo[]>(`https://api.github.com/users/${username}/repos`);

            setUser(userResponse.data);
            setRepos(reposResponse.data);
        } catch (err) {
            setError('User not found');
            setUser(null);
            setRepos([]);
        } finally {
            setLoading(false); // Set loading to false after API call completes
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

            {loading && <CircularProgress sx={{ mb: 2 }} />} {/* Show loading spinner while fetching data */}

            {error && (
                <Typography color="error" sx={{ mb: 2 }}>
                    {error}
                </Typography>
            )}

            {/* Show user profile and repositories only if the user data is available */}
            {user && <UserProfile user={user} />}
            {repos.length > 0 && <RepositoryList repositories={repos} />}
        </Container>
    );
};

export default App;

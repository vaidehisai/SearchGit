import React from 'react';
import { GitHubRepo } from '../types/GitHubRepo';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Link } from '@mui/material';

interface RepositoryListProps {
    repositories: GitHubRepo[];
}

const RepositoryList: React.FC<RepositoryListProps> = ({ repositories }) => {
    return (
        <div className="repository-list" style={{ padding: '16px' }}>
            <Typography variant="h5" gutterBottom>
                Repositories
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><Typography variant="h6">Repository Name</Typography></TableCell>
                            <TableCell><Typography variant="h6">Description</Typography></TableCell>
                            <TableCell><Typography variant="h6">name</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {repositories.map((repo) => (
                            <TableRow key={repo.name}>
                                <TableCell>
                                    <Link
                                        href={repo.html_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        color="primary"
                                    >
                                        {repo.name}
                                    </Link>
                                </TableCell>
                                <TableCell>{repo.description}</TableCell>
                                <TableCell>{repo.name}</TableCell>
                              
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default RepositoryList;

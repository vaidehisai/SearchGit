// src/components/RepositoryList.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RepositoryList from './RepositoryList';
import { GitHubRepo } from '../types/GitHubRepo';

describe('RepositoryList Component', () => {
    const mockRepositories: GitHubRepo[] = [
        {
            name: 'TestRepo1',
            html_url: 'https://github.com/user/TestRepo1',
            description: 'A test repository',
        },
        {
            name: 'TestRepo2',
            html_url: 'https://github.com/user/TestRepo2',
            description: '',
        },
    ];

    test('renders component with no repositories', () => {
        render(<RepositoryList repositories={[]} />);
        expect(screen.getByText(/Repositories/i)).toBeInTheDocument();
        expect(screen.queryByText('TestRepo1')).not.toBeInTheDocument();
    });

    test('renders repository names and descriptions correctly', () => {
        render(<RepositoryList repositories={mockRepositories} />);
        // Verify repository names and descriptions
        mockRepositories.forEach((repo) => {
            expect(screen.getByText(repo.name)).toBeInTheDocument();
            if (repo.description) {
                expect(screen.getByText(repo.description)).toBeInTheDocument();
            } else {
                expect(screen.getByText('No description provided')).toBeInTheDocument();
            }
        });
    });

    test('repository link opens in new tab with correct attributes', () => {
        render(<RepositoryList repositories={mockRepositories} />);
        const linkElement = screen.getByText('TestRepo1');
        expect(linkElement).toHaveAttribute('href', 'https://github.com/user/TestRepo1');
        expect(linkElement).toHaveAttribute('target', '_blank');
        expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
    });
});

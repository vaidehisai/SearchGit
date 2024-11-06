import React, { useState } from 'react';
import { GitHubRepo } from '../types/GitHubRepo';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Link,
  TableSortLabel,
  TablePagination,
} from '@mui/material';

interface RepositoryListProps {
  repositories: GitHubRepo[];
}

const RepositoryList: React.FC<RepositoryListProps> = ({ repositories }) => {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<string>('name');
  const [page, setPage] = useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortData = (array: GitHubRepo[]) => {
    const compare = (a: GitHubRepo, b: GitHubRepo) => {
      if (orderBy === 'name') {
        if (a.name < b.name) return order === 'asc' ? -1 : 1;
        if (a.name > b.name) return order === 'asc' ? 1 : -1;
        return 0;
      }
      if (orderBy === 'description') {
        if (a.description < b.description) return order === 'asc' ? -1 : 1;
        if (a.description > b.description) return order === 'asc' ? 1 : -1;
        return 0;
      }
      return 0;
    };

    return array.sort(compare);
  };

  const sortedRepositories = sortData(repositories);

  // Handle page change
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when rows per page change
  };

  // Slice the sorted repositories for pagination
  const paginatedRepositories = sortedRepositories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className="repository-list" style={{ padding: '16px' }}>
      <Typography variant="h5" gutterBottom>
        Repositories
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? order : 'asc'}
                  onClick={() => handleRequestSort('name')}
                >
                  Repository Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'description'}
                  direction={orderBy === 'description' ? order : 'asc'}
                  onClick={() => handleRequestSort('description')}
                >
                  Description
                </TableSortLabel>
              </TableCell>
              <TableCell>name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRepositories.map((repo) => (
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
                <TableCell>{repo.description || 'No description'}</TableCell>
                <TableCell>{repo.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]} // Options for rows per page
        component="div"
        count={repositories.length} // Total number of repositories
        rowsPerPage={rowsPerPage} // Current rows per page
        page={page} // Current page
        onPageChange={handleChangePage} // Page change handler
        onRowsPerPageChange={handleChangeRowsPerPage} // Rows per page change handler
      />
    </div>
  );
};

export default RepositoryList;

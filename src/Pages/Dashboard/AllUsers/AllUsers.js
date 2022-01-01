/* eslint-disable no-unused-expressions */
import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import {
  Divider,
  IconButton,
  InputBase,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import * as React from 'react';
import useUserData from '../../../hooks/useUserData';

export default function AllUsers() {
  const { users } = useUserData();
  const [searchText, setSearchText] = React.useState('');
  console.log(users);
  const [rows, setRows] = React.useState([]);
  const [isSearching, setIsSearching] = React.useState(false);

  React.useEffect(() => {
    if (isSearching) return;
    const temp = users?.filter(() => true);
    setRows([...temp]);
  }, [users]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchText) return;
    setIsSearching(true);
    const temp = users?.filter(
      (user) =>
        user.name.includes(searchText) ||
        user.email.includes(searchText) ||
        user.phone.includes(searchText)
    );
    setRows([...temp]);
    setSearchText('');
  };

  const cancelSearch = () => {
    const temp = users?.filter(() => true);
    setRows([...temp]);
    setIsSearching(false);
  };
  return (
    <div>
      <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: 400,
          my: 2,
          mx: 'auto'
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search for Users"
          inputProps={{ 'aria-label': 'search for users' }}
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
        />
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton color="error" sx={{ p: '10px' }} aria-label="directions" onClick={cancelSearch}>
          <SearchOffIcon />
        </IconButton>
      </Paper>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length &&
              rows?.map((row) => (
                <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {row._id}
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

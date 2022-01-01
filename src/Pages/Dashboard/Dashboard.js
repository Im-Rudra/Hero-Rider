import { Box, List, ListItem, ListItemIcon, ListItemText, Paper, Typography } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import AllUsers from './AllUsers/AllUsers';
import Courses from './Courses/Courses';

const menuItems = [{ title: 'Courses', path: '/' }];
const adminMenuItem = [
  {
    title: 'All Users',
    path: '/all-users'
  }
];

const drawerWidth = 240;

const theme = createTheme();

const useStyle = makeStyles(() => ({
  root: {
    display: 'flex'
  },
  drawer: {
    width: drawerWidth
  },
  drawerPaper: {
    width: drawerWidth
  },
  active: {
    background: '#f4f4f4 !important',
    borderRight: '3px solid #3869e6 !important'
  },
  appbar: {
    width: `calc(100% - ${drawerWidth}px) !important`
  },
  toolbar: {
    height: `calc(100vh - (${theme.mixins?.toolbar?.minHeight}px + 8px))`
  }
}));

const Dashboard = () => {
  const { dbUserData, logout } = useAuth();
  const classes = useStyle();
  const navigate = useNavigate();
  // const { path, url } = useRouteMatch();
  const { location } = window;

  return (
    <Box variant="div" sx={{ display: 'flex' }}>
      <Paper className={classes.toolbar} elevation={1} sx={{ width: '240px', borderRadius: 0 }}>
        <Typography variant="h4" sx={{ p: 2 }}>
          Dashboard
        </Typography>
        <List sx={{ overflowY: 'auto' }}>
          {menuItems.map((item) => (
            <ListItem
              className={location.pathname.includes(`${item.path}`) ? classes.active : null}
              button
              key={item.title}
              onClick={() => navigate(`.${item.path}`)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
          {dbUserData?.isAdmin &&
            adminMenuItem.map((item) => (
              <ListItem
                className={location.pathname.includes(`${item.path}`) ? classes.active : null}
                button
                key={item.title}
                onClick={() => navigate(`.${item.path}`)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItem>
            ))}
          <ListItem button onClick={logout}>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Paper>
      <Box sx={{ width: '100%' }}>
        <Routes>
          <Route path="" element={<Courses />} />
          <Route path="all-users" element={<AllUsers />} />
        </Routes>
      </Box>
    </Box>
  );
};
export default Dashboard;

// src/Dashboard.js
import React from 'react';
import './Dashboard.css';
import LineChart from './LineChart';
import { useAuth0 } from "@auth0/auth0-react";
import { AppBar, Toolbar, Typography, CssBaseline, Drawer, List, ListItem, ListItemIcon, ListItemText, Box } from '@mui/material';
import { Dashboard as DashboardIcon, BarChart as BarChartIcon, People as PeopleIcon } from '@mui/icons-material';
import { Grid, Card, CardContent } from '@mui/material';
import Pie from './Charts/Pie';
import LogoutButton from './logout';

const drawerWidth = 240;

function Dashboard() {
    const { user, isLoading } = useAuth0();
    if (isLoading) {
        return <div>Loading ...</div>;
      }
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
        <Toolbar >
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            My Dashboard
          </Typography>
          {user.name}
          <LogoutButton/>
        </Toolbar>
        
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
       
        <Toolbar >
        <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
        </Toolbar>
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {['Dashboard', 'Reports', 'Users'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index === 0 ? <DashboardIcon /> : index === 1 ? <BarChartIcon /> : <PeopleIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, ml: `${drawerWidth}px`, mt: 8 }}
      >
        <Typography variant="h4">Dashboard Content</Typography>
        <Grid container spacing={3} mt={4}>
          <Grid item xs={12} md={6}>
            <Card>
                <LineChart/>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
            <CardContent>
              <Pie/>
              </CardContent>
            </Card>
          </Grid>
          
        </Grid>
      </Box>
    </Box>
  );
}

export default Dashboard;

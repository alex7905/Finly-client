import React from 'react';
import { Box, Paper, Typography, List, ListItem, ListItemText, Switch, Divider } from '@mui/material';

const Settings = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      
      <Paper sx={{ mt: 3 }}>
        <List>
          <ListItem>
            <ListItemText 
              primary="Dark Mode" 
              secondary="Toggle dark/light theme"
            />
            <Switch />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText 
              primary="Email Notifications" 
              secondary="Receive email updates about your account"
            />
            <Switch defaultChecked />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText 
              primary="Two-Factor Authentication" 
              secondary="Add an extra layer of security"
            />
            <Switch />
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
};

export default Settings; 
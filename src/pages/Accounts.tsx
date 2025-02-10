import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  Alert,
} from '@mui/material';
import {
  AccountBalance as BankIcon,
  CreditCard as CardIcon,
  Add as AddIcon,
  Refresh as RefreshIcon,
  Delete as DeleteIcon,
  Link as LinkIcon,
} from '@mui/icons-material';

interface Account {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'credit' | 'investment';
  balance: number;
  institution: string;
  lastUpdated: string;
}

const mockAccounts: Account[] = [
  {
    id: '1',
    name: 'Main Checking',
    type: 'checking',
    balance: 5420.50,
    institution: 'Chase',
    lastUpdated: '2024-02-10T15:30:00',
  },
  {
    id: '2',
    name: 'Savings',
    type: 'savings',
    balance: 12750.75,
    institution: 'Bank of America',
    lastUpdated: '2024-02-10T15:30:00',
  },
];

const bankList = [
  'Chase',
  'Bank of America',
  'Wells Fargo',
  'Citibank',
  'Capital One',
  'US Bank',
  // Add more banks as needed
];

const Accounts = () => {
  const [accounts, setAccounts] = useState<Account[]>(mockAccounts);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBank, setSelectedBank] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleConnectBank = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Here you would typically integrate with a service like Plaid
      // For now, we'll just simulate the connection
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newAccount: Account = {
        id: String(accounts.length + 1),
        name: `${selectedBank} Account`,
        type: 'checking',
        balance: 0,
        institution: selectedBank,
        lastUpdated: new Date().toISOString(),
      };
      
      setAccounts([...accounts, newAccount]);
      setOpenDialog(false);
      setSelectedBank('');
    } catch (err) {
      setError('Failed to connect bank account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRefreshAccount = async (accountId: string) => {
    // Implement account refresh logic
    console.log('Refreshing account:', accountId);
  };

  const handleDeleteAccount = (accountId: string) => {
    setAccounts(accounts.filter(account => account.id !== accountId));
  };

  const getAccountIcon = (type: string) => {
    switch (type) {
      case 'credit':
        return <CardIcon />;
      default:
        return <BankIcon />;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h5" fontWeight="medium">
          Connected Accounts
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
        >
          Connect Bank
        </Button>
      </Box>

      <Grid container spacing={3}>
        {accounts.map((account) => (
          <Grid item xs={12} md={6} key={account.id}>
            <Paper sx={{ p: 0 }}>
              <List>
                <ListItem>
                  <ListItemIcon>
                    {getAccountIcon(account.type)}
                  </ListItemIcon>
                  <ListItemText
                    primary={account.name}
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="text.secondary">
                          {account.institution}
                        </Typography>
                        <br />
                        <Typography component="span" variant="body2" color="text.secondary">
                          Last updated: {new Date(account.lastUpdated).toLocaleString()}
                        </Typography>
                      </>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      ${account.balance.toLocaleString()}
                    </Typography>
                    <IconButton 
                      size="small" 
                      onClick={() => handleRefreshAccount(account.id)}
                      sx={{ mr: 1 }}
                    >
                      <RefreshIcon />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      color="error"
                      onClick={() => handleDeleteAccount(account.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Connect Bank Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Connect Your Bank</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <FormControl fullWidth>
              <InputLabel>Select Your Bank</InputLabel>
              <Select
                value={selectedBank}
                label="Select Your Bank"
                onChange={(e) => setSelectedBank(e.target.value)}
              >
                {bankList.map((bank) => (
                  <MenuItem key={bank} value={bank}>
                    {bank}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Your bank credentials are securely encrypted and never stored on our servers.
              We use industry-standard security protocols to protect your data.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleConnectBank}
            disabled={!selectedBank || loading}
            startIcon={<LinkIcon />}
          >
            {loading ? 'Connecting...' : 'Connect Bank'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Accounts; 
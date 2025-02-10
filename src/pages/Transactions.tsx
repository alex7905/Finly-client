import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TransactionDialog from '../components/TransactionDialog';

const Transactions = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: 'expense',
      amount: 15.99,
      description: 'Netflix Subscription',
      category: 'Entertainment',
      date: '2024-02-10',
    },
    {
      id: 2,
      type: 'income',
      amount: 4500,
      description: 'Monthly Salary',
      category: 'Salary',
      date: '2024-02-09',
    },
  ]);

  const handleAddTransaction = (newTransaction: any) => {
    setTransactions([
      ...transactions,
      {
        ...newTransaction,
        id: transactions.length + 1,
        amount: parseFloat(newTransaction.amount),
      },
    ]);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight="medium">
          Transactions
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
        >
          Add Transaction
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Type</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>
                  <Chip 
                    label={transaction.category} 
                    size="small"
                    color={transaction.type === 'income' ? 'success' : 'default'}
                  />
                </TableCell>
                <TableCell>
                  <Typography
                    color={transaction.type === 'income' ? 'success.main' : 'error.main'}
                  >
                    {transaction.type === 'income' ? '+' : '-'}
                    ${transaction.amount.toLocaleString()}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={transaction.type}
                    size="small"
                    color={transaction.type === 'income' ? 'success' : 'error'}
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton size="small">
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" color="error">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TransactionDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSubmit={handleAddTransaction}
      />
    </Box>
  );
};

export default Transactions; 
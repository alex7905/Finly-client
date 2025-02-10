import React from 'react';
import { 
  Box, 
  Grid, 
  Paper, 
  Typography, 
  useTheme, 
  Button, 
  Avatar,
  Divider,
  LinearProgress
} from '@mui/material';
import { motion } from 'framer-motion';
import AddIcon from '@mui/icons-material/Add';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PaymentsIcon from '@mui/icons-material/Payments';
import SavingsIcon from '@mui/icons-material/Savings';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useAuth } from '../context/AuthContext';

const MotionPaper = motion(Paper);

const StatCard = ({ title, amount, icon, trend, color }: any) => (
  <Paper
    elevation={0}
    sx={{
      p: 2.5,
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      borderRadius: 2,
      border: '1px solid',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      background: `linear-gradient(45deg, ${color}15, ${color}08)`,
    }}
  >
    <Avatar
      sx={{
        bgcolor: `${color}15`,
        color: color,
        width: 48,
        height: 48,
      }}
    >
      {icon}
    </Avatar>
    <Box>
      <Typography color="text.secondary" variant="body2">
        {title}
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: 'bold', my: 0.5 }}>
        ${amount.toLocaleString()}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {trend > 0 ? (
          <ArrowUpwardIcon sx={{ color: 'success.main', fontSize: 16 }} />
        ) : (
          <ArrowDownwardIcon sx={{ color: 'error.main', fontSize: 16 }} />
        )}
        <Typography
          variant="caption"
          color={trend > 0 ? 'success.main' : 'error.main'}
          sx={{ fontWeight: 'medium' }}
        >
          {Math.abs(trend)}% vs last month
        </Typography>
      </Box>
    </Box>
  </Paper>
);

const GoalCard = ({ title, current, target, color }: any) => (
  <Box sx={{ mb: 2 }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
      <Typography variant="body2">{title}</Typography>
      <Typography variant="body2" color="text.secondary">
        ${current.toLocaleString()} / ${target.toLocaleString()}
      </Typography>
    </Box>
    <LinearProgress
      variant="determinate"
      value={(current / target) * 100}
      sx={{
        height: 8,
        borderRadius: 4,
        bgcolor: `${color}20`,
        '& .MuiLinearProgress-bar': {
          bgcolor: color,
        },
      }}
    />
  </Box>
);

const TransactionItem = ({ avatar, name, amount, date, type, category }: any) => {
  const theme = useTheme();
  
  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      py: 2,
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar 
          sx={{ 
            bgcolor: type === 'income' ? 'success.light' : 'primary.light',
            width: 40,
            height: 40
          }}
        >
          {name[0]}
        </Avatar>
        <Box>
          <Typography variant="body2" fontWeight="medium">{name}</Typography>
          <Typography variant="caption" color="text.secondary">{category}</Typography>
        </Box>
      </Box>
      <Box sx={{ textAlign: 'right' }}>
        <Typography 
          variant="body2" 
          fontWeight="medium"
          color={type === 'income' ? 'success.main' : 'text.primary'}
        >
          {type === 'income' ? '+' : '-'}{amount}
        </Typography>
        <Typography variant="caption" color="text.secondary">{date}</Typography>
      </Box>
    </Box>
  );
};

const Dashboard = () => {
  const theme = useTheme();
  const { user } = useAuth();

  const stats = [
    { 
      title: 'Total Balance',
      amount: 24500,
      icon: <AccountBalanceIcon />,
      trend: 8.5,
      color: theme.palette.primary.main
    },
    { 
      title: 'Monthly Income',
      amount: 6200,
      icon: <PaymentsIcon />,
      trend: 12.3,
      color: theme.palette.success.main
    },
    { 
      title: 'Total Savings',
      amount: 8400,
      icon: <SavingsIcon />,
      trend: -5.2,
      color: theme.palette.info.main
    },
  ];

  const goals = [
    { title: 'Emergency Fund', current: 5000, target: 10000, color: theme.palette.success.main },
    { title: 'New Car', current: 15000, target: 25000, color: theme.palette.primary.main },
    { title: 'Vacation', current: 1000, target: 5000, color: theme.palette.warning.main },
  ];

  const recentTransactions = [
    { 
      name: 'Netflix',
      amount: '$15.99',
      date: 'Today, 2:30 PM',
      type: 'expense',
      category: 'Entertainment',
      avatar: ''
    },
    { 
      name: 'Salary',
      amount: '$4,500',
      date: 'Yesterday, 9:00 AM',
      type: 'income',
      category: 'Salary',
      avatar: ''
    },
    { 
      name: 'Amazon',
      amount: '$253.50',
      date: 'Feb 8, 4:15 PM',
      type: 'expense',
      category: 'Shopping',
      avatar: ''
    },
  ];

  return (
    <Box sx={{ 
      p: 3,
      minHeight: '100vh',
      bgcolor: 'background.default',
      color: 'text.primary'
    }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h5" gutterBottom fontWeight="medium">
            Welcome back, {user?.fullName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ borderRadius: 2 }}
        >
          Add Transaction
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Stats Cards */}
        {stats.map((stat, index) => (
          <Grid item xs={12} md={4} key={index}>
            <StatCard {...stat} />
          </Grid>
        ))}

        {/* Recent Transactions */}
        <Grid item xs={12} md={8}>
          <Paper 
            sx={{ 
              p: 3, 
              height: '100%',
              bgcolor: 'background.paper',
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Recent Transactions
            </Typography>
            <Divider sx={{ my: 2 }} />
            {recentTransactions.map((transaction, index) => (
              <React.Fragment key={index}>
                <TransactionItem {...transaction} />
                {index < recentTransactions.length - 1 && (
                  <Divider sx={{ my: 1 }} />
                )}
              </React.Fragment>
            ))}
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Button color="primary">View All Transactions</Button>
            </Box>
          </Paper>
        </Grid>

        {/* Financial Goals */}
        <Grid item xs={12} md={4}>
          <Paper 
            sx={{ 
              p: 3, 
              height: '100%',
              bgcolor: 'background.paper',
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Financial Goals
            </Typography>
            <Divider sx={{ my: 2 }} />
            {goals.map((goal, index) => (
              <GoalCard key={index} {...goal} />
            ))}
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                sx={{ borderRadius: 2 }}
              >
                Add New Goal
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 
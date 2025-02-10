import React from 'react';
import { Box, Typography } from '@mui/material';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';

const Logo = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(45deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))',
          borderRadius: '12px',
          p: 1,
          backdropFilter: 'blur(10px)',
        }}
      >
        <AccountBalanceWalletOutlinedIcon 
          sx={{ 
            fontSize: 32,
            color: '#fff',
          }} 
        />
      </Box>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 800,
          background: 'linear-gradient(to right, #fff, rgba(255,255,255,0.8))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.02em',
        }}
      >
        Finly
      </Typography>
    </Box>
  );
};

export default Logo; 
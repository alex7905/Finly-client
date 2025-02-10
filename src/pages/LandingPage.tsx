import React from 'react';
import { Box, Button, Container, Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { keyframes } from '@mui/system';
import Logo from '../components/Logo';
import { useAuth } from '../context/AuthContext';

// Create gradient animation
const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

// Create pulse animation for the button
const pulseAnimation = keyframes`
  0% { transform: scale(1) }
  50% { transform: scale(1.05) }
  100% { transform: scale(1) }
`;

const FeatureCard = ({ icon, title, description, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
  >
    <Box
      sx={{
        p: 4,
        height: '100%',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '24px',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        transition: 'all 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        '&:hover': {
          transform: 'translateY(-8px)',
          background: 'rgba(255, 255, 255, 0.08)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      <Box 
        sx={{ 
          mb: 3,
          p: 2,
          borderRadius: '16px',
          background: 'rgba(255, 255, 255, 0.1)',
          width: 'fit-content',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {React.cloneElement(icon, { sx: { fontSize: 32, color: '#fff' } })}
      </Box>
      <Typography 
        variant="h6" 
        gutterBottom
        sx={{ 
          fontWeight: 600,
          letterSpacing: '-0.02em',
          color: '#fff'
        }}
      >
        {title}
      </Typography>
      <Typography 
        variant="body1" 
        sx={{ 
          color: 'rgba(255, 255, 255, 0.7)',
          lineHeight: 1.6
        }}
      >
        {description}
      </Typography>
    </Box>
  </motion.div>
);

const LandingPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: <SecurityIcon />,
      title: 'Enterprise Security',
      description: 'Bank-level encryption and security protocols to protect your financial data.',
      delay: 0.2,
    },
    {
      icon: <TrendingUpIcon />,
      title: 'Smart Analytics',
      description: 'AI-powered insights to help you make better financial decisions.',
      delay: 0.4,
    },
    {
      icon: <SpeedIcon />,
      title: 'Real-time Updates',
      description: 'Instant notifications and live tracking of your financial activities.',
      delay: 0.6,
    },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(-45deg, #7928CA, #6B46C1, #4C1D95, #5B21B6)`,
        backgroundSize: '400% 400%',
        animation: `${gradientAnimation} 15s ease infinite`,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%)',
          transform: 'rotate(-45deg)',
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box 
          sx={{ 
            position: 'absolute',
            top: { xs: 20, md: 40 },
            left: { xs: 20, md: 40 },
          }}
        >
          <Logo />
        </Box>

        <Box 
          sx={{ 
            py: { xs: 10, md: 16 },
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ width: '100%', maxWidth: '900px' }}
          >
            <Typography
              component="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '4rem' },
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                mb: 3,
                background: 'linear-gradient(to right, #fff, rgba(255,255,255,0.7))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textAlign: 'center',
              }}
            >
              The Future of <br />
              Digital Banking is Here
            </Typography>
            <Typography
              variant="h5"
              sx={{ 
                mb: 6, 
                fontWeight: 400, 
                maxWidth: '600px', 
                mx: 'auto',
                color: 'rgba(255, 255, 255, 0.8)',
                lineHeight: 1.6,
                letterSpacing: '-0.01em',
              }}
            >
              Experience seamless financial management with AI-powered insights 
              and enterprise-grade security.
            </Typography>
            <Box sx={{ 
              position: 'absolute', 
              top: 20, 
              right: 40, 
              display: 'flex', 
              gap: 2 
            }}>
              {isAuthenticated ? (
                <Button
                  variant="contained"
                  onClick={() => navigate('/dashboard')}
                  sx={{ 
                    backgroundColor: 'primary.main',
                    '&:hover': { backgroundColor: 'primary.dark' }
                  }}
                >
                  Go to Dashboard
                </Button>
              ) : (
                <>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/login')}
                    sx={{ color: 'white', borderColor: 'white' }}
                  >
                    Login
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => navigate('/signup')}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </Box>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/signup')}
              sx={{
                py: 2,
                px: 6,
                borderRadius: '100px',
                fontSize: '1.125rem',
                fontWeight: 600,
                letterSpacing: '-0.01em',
                background: 'rgba(255, 255, 255, 0.9)',
                color: '#4C1D95',
                border: 'none',
                transition: 'all 0.3s ease',
                animation: `${pulseAnimation} 2s infinite`,
                '&:hover': {
                  background: '#fff',
                  transform: 'scale(1.05)',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                },
              }}
            >
              Get Started Now
            </Button>
          </motion.div>

          <Grid container spacing={4} sx={{ mt: 12 }}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <FeatureCard {...feature} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default LandingPage; 
import React, { useState } from 'react';
import { Box, Button, Paper, Typography, LinearProgress, Grid, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import GoalDialog from '../components/GoalDialog';

const Goals = () => {
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const [goals, setGoals] = useState([
    { id: 1, name: 'Emergency Fund', target: 10000, current: 5000, deadline: '2024-12-31' },
    { id: 2, name: 'New Car', target: 25000, current: 15000, deadline: '2025-06-30' },
    { id: 3, name: 'Vacation', target: 5000, current: 1000, deadline: '2024-08-01' },
  ]);

  const handleAddGoal = (newGoal: any) => {
    const updatedGoals = [...goals, {
      id: goals.length + 1,
      name: newGoal.title,
      current: parseFloat(newGoal.current),
      target: parseFloat(newGoal.target),
      deadline: newGoal.deadline,
    }];
    setGoals(updatedGoals);
    setOpenDialog(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Financial Goals
        </Typography>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
          sx={{ borderRadius: 2 }}
        >
          Add New Goal
        </Button>
      </Box>

      <Grid container spacing={3}>
        {goals.map((goal) => (
          <Grid item xs={12} md={4} key={goal.id}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                {goal.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Target: ${goal.target.toLocaleString()}
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={(goal.current / goal.target) * 100}
                sx={{ my: 1, height: 8, borderRadius: 4 }}
              />
              <Typography variant="body2" color="text.secondary">
                ${goal.current.toLocaleString()} of ${goal.target.toLocaleString()}
              </Typography>
              <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                Deadline: {new Date(goal.deadline).toLocaleDateString()}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <GoalDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSubmit={handleAddGoal}
      />
    </Box>
  );
};

export default Goals; 
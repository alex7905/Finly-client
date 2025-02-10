import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from '@mui/material';

interface GoalDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (goal: any) => void;
}

const GoalDialog = ({ open, onClose, onSubmit }: GoalDialogProps) => {
  const [formData, setFormData] = useState({
    title: '',
    target: '',
    current: '',
    deadline: new Date().toISOString().split('T')[0],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
    setFormData({
      title: '',
      target: '',
      current: '',
      deadline: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Add New Goal</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              name="title"
              label="Goal Title"
              value={formData.title}
              onChange={handleChange}
              required
              fullWidth
            />

            <TextField
              name="target"
              label="Target Amount"
              type="number"
              value={formData.target}
              onChange={handleChange}
              required
              fullWidth
            />

            <TextField
              name="current"
              label="Current Amount"
              type="number"
              value={formData.current}
              onChange={handleChange}
              required
              fullWidth
            />

            <TextField
              name="deadline"
              label="Target Date"
              type="date"
              value={formData.deadline}
              onChange={handleChange}
              required
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">Add Goal</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default GoalDialog; 
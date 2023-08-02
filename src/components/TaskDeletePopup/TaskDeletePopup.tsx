import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

interface TaskDeletePopupProps {
  open: boolean;
  onClose: () => void;
  onConfirmDelete: () => void;
}

const TaskDeletePopup: React.FC<TaskDeletePopupProps> = ({ open, onClose, onConfirmDelete }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        Are you sure you want to delete this task?
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          No
        </Button>
        <Button onClick={onConfirmDelete} color="secondary">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskDeletePopup;

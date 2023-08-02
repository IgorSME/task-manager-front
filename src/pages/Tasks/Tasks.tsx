
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  useParams } from 'react-router-dom';
import { getTasks, createTask } from '../../redux/tasks/task-operations';
import { RootState } from '../../redux/store';
import { AppDispatch } from '../../types/appTypes';

import Task from '../Task/Task';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

 export interface ITaskCreate {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  taskId: number;
}

const Tasks = () => {
  const tasks = useSelector((state: RootState) => state.tasks.data);
  const dispatch = useDispatch<AppDispatch>();
  const { categoryId } = useParams();

  
  
  useEffect(() => {
    if (categoryId !== undefined) {
      dispatch(getTasks(Number(categoryId)));
    }
  }, [dispatch, categoryId]);

  const [open, setOpen] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskStartDate, setNewTaskStartDate] = useState('');
  const [newTaskEndDate, setNewTaskEndDate] = useState('');

  const handleAddTask = () => {
    setOpen(true);
  };

  const handleCreateTask = () => {
 
    const newTaskData: ITaskCreate = {
    name: newTaskName,
    description: newTaskDescription,
    startDate: new Date(newTaskStartDate),
    endDate: new Date(newTaskEndDate),
    taskId: Number(categoryId),
  };
    dispatch(createTask({
      categoryId: Number(categoryId),
      taskData: newTaskData,
    }))
    setOpen(false);

    setNewTaskName('');
    setNewTaskDescription('');
    setNewTaskStartDate('');
    setNewTaskEndDate('');
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderTaskCards = () => {
    if (!tasks) return null;
    const rows = [];
    const rowSize = 3;

    for (let i = 0; i < tasks.length; i += rowSize) {
      const rowTasks = tasks.slice(i, i + rowSize);
      const taskCards = rowTasks.map((task) => (
        <Grid key={task.id} item xs={12} sm={6} md={4}>
          <Task task={task} />
        </Grid>
      ));
      rows.push(
        <Grid key={i} container spacing={2}>
          {taskCards}
        </Grid>
      );
    }
    return rows;
  };

  return (
    <section>
      <div className="container">
        <p>Tasks</p>
        <Button onClick={handleAddTask} variant="contained" color="primary">
          Add Task
        </Button>
        <Grid container spacing={2}>
          {renderTaskCards()}
        </Grid>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add New Task</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              fullWidth
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Description"
              fullWidth
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Start Date"
              fullWidth
              value={newTaskStartDate}
              onChange={(e) => setNewTaskStartDate(e.target.value)}
            />
            <TextField
              margin="dense"
              label="End Date"
              fullWidth
              value={newTaskEndDate}
              onChange={(e) => setNewTaskEndDate(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleCreateTask} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </section>
  );
};

export default Tasks;
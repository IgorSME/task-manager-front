
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../types/appTypes';
import { changeTask, removeTask } from '../../redux/tasks/task-operations';
import { ITask } from '../../redux/tasks/tasksSlice';
import { formatDate } from '../../utils/formatDate';
import { useState } from 'react';
import TaskDeletePopup from '../../components/TaskDeletePopup';
import TaskForm from '../../components/TaskForm/TaskForm';

const Task = ({ task }: { task: ITask}) => {
    const [deletePopupOpen, setDeletePopupOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    // console.log(task);

    const handleEditTask = () => {
        setIsEditing(true);
    }

  const handleDeleteTask = () => {
    setDeletePopupOpen(true);
  };

  const handleCloseDeletePopup = () => {
    setDeletePopupOpen(false);
  };

  const handleConfirmDelete = () => {
    if (task.id !== undefined) {
      dispatch(removeTask(task.id));
    }
    setDeletePopupOpen(false);
  };
    
    const handleEditFormSubmit = (updatedTaskData: ITask) => {
    if (task.id !== undefined) {
      dispatch(changeTask({ taskId: task.id, taskData: updatedTaskData }));
    }
    setIsEditing(false); 
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          Name: {task.name}
        </Typography>
        <Typography color="text.secondary">
          Start Date: {formatDate(task.startDate)}
        </Typography>
        <Typography color="text.secondary">
          End Date: {formatDate(task.endDate)}
        </Typography>
        <Button onClick={() => handleEditTask()} variant="contained" color="primary">
          Edit Task
        </Button>
        <Button onClick={() => handleDeleteTask()} variant="contained" color="secondary">
          Delete
              </Button>
              <TaskDeletePopup
        open={deletePopupOpen}
        onClose={handleCloseDeletePopup}
        onConfirmDelete={handleConfirmDelete}
      />
          </CardContent>
          {isEditing && (
        <CardContent>
          
          <TaskForm open={isEditing} task={task} onSubmit={handleEditFormSubmit} onCancel={() => setIsEditing(false)} onClose={() => setIsEditing(false)} />
        </CardContent>
      )}
    </Card>
  );
};

export default Task;

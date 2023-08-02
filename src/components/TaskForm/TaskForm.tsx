import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../types/appTypes';
import { createTask, changeTask } from '../../redux/tasks/task-operations';
import { ITask } from '../../redux/tasks/tasksSlice';
import { formatDateForTextField } from '../../utils/formatDate';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface TaskFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (updatedTaskData: ITask) => void;
  onCancel: () => void;
  task?: ITask;
}

const TaskForm: React.FC<TaskFormProps> = ({ open, onClose, onSubmit, onCancel, task }) => {
  const dispatch = useDispatch<AppDispatch>();

  const initialValues: ITask = {
    name: task?.name || '',
    description: task?.description || '',
    startDate: task?.startDate || new Date(),
    endDate: task?.endDate || new Date(),
    taskId: task?.taskId || 0,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Task Name is required'),
    description: Yup.string().required('Description is required'),
    startDate: Yup.date().required('Start Date is required'),
    endDate: Yup.date().required('End Date is required')
  });

  const handleSubmit = (values: ITask) => {
    if (task) {
      if (task.id !== undefined) {
        dispatch(changeTask({ taskId: task.id, taskData: values }));
      }
    } else {
      dispatch(createTask({ categoryId: values.taskId, taskData: values }));
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{task ? 'Edit Task' : 'Create Task'}</DialogTitle>
      <DialogContent>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ values, handleChange, handleBlur, errors, touched }) => (
            <Form>
              <Field
                as={TextField}
                label="Task Name"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
                margin="normal"
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
              <Field
                as={TextField}
                label="Description"
                name="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
                margin="normal"
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description && errors.description}
              />
              <Field
                as={TextField}
                label="Start Date"
                type="date"
                name="startDate"
                value={formatDateForTextField(values.startDate)}
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
                margin="normal"
                error={touched.startDate && Boolean(errors.startDate)}
                helperText={touched.startDate && errors.startDate}
              />
              <Field
                as={TextField}
                label="End Date"
                type="date"
                name="endDate"
                value={formatDateForTextField(values.endDate)}
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
                margin="normal"
                error={touched.endDate && Boolean(errors.endDate)}
                helperText={touched.endDate && errors.endDate}
              />
              <ErrorMessage name="name" component="div" />
              <ErrorMessage name="description" component="div" />
              <ErrorMessage name="startDate" component="div" />
              <ErrorMessage name="endDate" component="div" />
              <DialogActions>
                <Button onClick={onCancel} color="primary">
                  Cancel
                </Button>
                <Button type="submit" color="primary">
                  {task ? 'Save Changes' : 'Create'}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default TaskForm;

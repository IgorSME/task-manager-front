import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "../../redux/store";
import { Category, createCategory, removeCategory, changeCategory, getCategories } from "../../redux/categories/categories-operations";
import { AppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { getTasks } from "../../redux/tasks/task-operations";
import ConfirmationDialog from "../../components/ConfirmationWindow/ConfirmationWindow";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from "@mui/material";
import { Formik, Field, Form, ErrorMessage,FormikHelpers } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  newCategory: Yup.string().required('Category name is required'),
});

const Categories = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const categories = useSelector((state: RootState) => state.categories.data)
  const id = useSelector((state: RootState) => state.auth.id)

  const [showActionsMenu, setShowActionsMenu] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editCategoryName, setEditCategoryName] = useState('')

  useEffect(() => {
    dispatch(getCategories()); 
  }, [dispatch]);

  const handleAddCategory = (newCategoryValue: string, resetForm:FormikHelpers<any>['resetForm']) => {
   
    if (id !== null && id !== undefined) {
    const newCategoryName: Category = {
      userId: id,
      name: newCategoryValue,
    };
      console.log(
        newCategoryValue
      );
      
    dispatch(createCategory(newCategoryName));
    resetForm()
  } else {

    console.error('Not userId');
  }
  }
  
  const handleDeleteCategory = () => {
    if (selectedCategoryId !== null) {
      setShowConfirmationDialog(true);
  }
}

   const handleConfirmDeleteCategory = () => {
    if (selectedCategoryId !== null) {
      dispatch(removeCategory(selectedCategoryId));
      handleCloseActionsMenu();
      setShowConfirmationDialog(false)
    }
   };
  
  const handleCanceledDeleteCategory = () => {
    setShowConfirmationDialog(false);
  }

  const handleUpdateCategory = () => {
    if (selectedCategoryId !== null) {
      dispatch(changeCategory({ id: selectedCategoryId, name: editCategoryName }));
      handleCloseActionsMenu();
      setShowEditDialog(false);
    }
  };

  const handleEditCategory = (categoryName: string) => {
    setEditCategoryName(categoryName);
    setShowEditDialog(true)
  }

  const handleCloseeditDialog = () => {
    setShowEditDialog(false)
  }

   const handleMoreButton = (categoryId: number | null) => {
     if (categoryId !== null) {
       dispatch(getTasks(categoryId));
      navigate(`/categories/${categoryId}/tasks`);
    }
  };

  const handleOpenActionsMenu = (categoryId: number | undefined) => {
    if (categoryId !== undefined) {
      setSelectedCategoryId((prevSelectedCategoryId) => prevSelectedCategoryId  === categoryId ? null : categoryId);
    }
    setShowActionsMenu(true);
  };

  const handleCloseActionsMenu = () => {
    setShowActionsMenu(false);
    setSelectedCategoryId(null);
  };

  return (
    <section>
      <div className="container">
        <h2>Categories</h2>

        <Formik initialValues={{
            newCategory: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values, {resetForm}) => {
            console.log(values.newCategory);
            handleAddCategory(values.newCategory, resetForm);
          }}>
          {({ errors, touched, values, handleChange, handleBlur }) => (
            <Form>
              <div>
                <Field
                  type="text"
                  name="newCategory"
                        value={values.newCategory}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        as={TextField}
                        error={touched.newCategory && Boolean(errors.newCategory)}
                        helperText={touched.newCategory && errors.newCategory}
                        placeholder="Enter category name"
                        inputProps={{
                          style: { backgroundColor: 'white' },
                          }}
                />
                <ErrorMessage name="newCategory" component="div"/>
              </div>
              <button type="submit">Add Category</button>
            </Form>
          )}
        </Formik>
        <ul>
          {categories.map((category) => (
            category.id != null ? (
              <li key={category.id}>
                <Box display="flex" alignItems="center">
                  <Typography style={{ flex: 1 }}>{category.name}</Typography>
                  <Box position="relative">
                    <Button onClick={() => handleOpenActionsMenu(category.id)}>Actions</Button>
                    {showActionsMenu && selectedCategoryId === category.id && (
                      <Box
                        position="absolute"
                        top="100%"
                        left={0}
                        bgcolor="#fff"
                        border="1px solid #ccc"
                        zIndex={1}
                        p={1}
                        minWidth="fit-content"
                      >
                        <Button
                          style={{ display: "block" }} 
                          onClick={handleDeleteCategory}
                        >
                          Delete
                        </Button>
                        <Button
                          style={{ display: "block" }} 
                          onClick={() => handleEditCategory(category.name)}
                        >
                          Edit
                        </Button>
                      </Box>
                    )}
                  </Box>
                  <Button onClick={() => handleMoreButton(category.id ?? null)}>More</Button>
                </Box>
              </li>
            ) : null
          ))}
        </ul>
        <ConfirmationDialog isOpen={showConfirmationDialog} onCancel={handleCanceledDeleteCategory} onConfirm={handleConfirmDeleteCategory} />
        <Dialog open={showEditDialog} onClose={handleCloseeditDialog}>
          <DialogTitle>{`Change category ${categories.find(category => category.id === selectedCategoryId)?.name}`}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter a new category name:
            </DialogContentText>
            <TextField autoFocus fullWidth value={editCategoryName} onChange={(e)=> setEditCategoryName(e.target.value)}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseeditDialog} color="primary">Cancel</Button>
            <Button onClick={handleUpdateCategory} color="primary">Save changes</Button>
          </DialogActions>
        </Dialog>
      </div>
    </section>
  );
};

export default Categories;

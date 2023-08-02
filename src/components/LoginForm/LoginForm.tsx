import { nanoid } from 'nanoid';
import  Button  from '../../shared/Button';

import { Formik, FormikHelpers  } from 'formik';

import { Form, Field } from 'formik';
import validationSchema from "../../schemas/loginFormSchema";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { logInAuth } from '../../redux/auth/auth-operations';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

const initialValues = {
  password: '',
  email: '',
};

type FormValues = {
    password: string;
    email: string;
  };
  

const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const passwordInputId = nanoid();
  const emailInputId = nanoid();

//   const [login] = useLoginMutation();

  const handleSubmit =  async (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => {
    const { resetForm } = formikHelpers;
    try {
      await dispatch(logInAuth(values));
      resetForm();
      navigate('/');
    
    } catch (error) {
    if (error instanceof AxiosError) {
      console.log("AxiosError: ", error.message);
    } else {
      console.log("Error: ", error);
    }
  }
  };

  return (
    <>
      <p>Please, enter your login and password</p>
      <Formik
        name="login"
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnMount
        initialTouched={{ zip: true }}
      >
        {({ errors, touched }) => (
          <Form name="login">
            <label htmlFor={emailInputId}>
            Email
              <Field
                type="email"
                name="email"
                placeholder="Enter your email"
                title="email"
                id={emailInputId}
                required
              />
             
              {touched.email && errors.email && (
                <p>{errors.email}</p>
              )}
            </label>
            <label htmlFor={passwordInputId}>
            Password
              <Field
                type="password"
                name="password"
                id={passwordInputId}
                title="Password may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
                placeholder="Enter password*"
              />
             
              {touched.password && errors.password && (
                <p>{errors.password}</p>
              )}
            </label>
            <Button type='submit'>
            LogIn
          </Button>
           
          </Form>
        )}
      </Formik>
     
    </>
  );
};

export default LoginForm;
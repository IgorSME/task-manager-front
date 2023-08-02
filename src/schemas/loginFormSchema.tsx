import * as Yup from 'yup';

const validationSchema = Yup.object({
  password: Yup.string().required().min(8, 'password is too short').max(10, 'Password Long!'),
  email: Yup.string().email('Invalid email').required(),
});

export default validationSchema;

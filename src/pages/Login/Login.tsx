import { NavLink } from 'react-router-dom';

import FormWrapper from '../../shared/FormWrapper';
import LoginForm from '../../components/LoginForm';

const Login = () => {
  return (
    <section>
      <div className="container">
        <h2>Login Form</h2>
        <FormWrapper>
          <LoginForm />
        </FormWrapper>
        <p>Haven't account? </p>
        <NavLink to="/registration">Please, reg</NavLink>
      </div>
    </section>
  );
};

export default Login;

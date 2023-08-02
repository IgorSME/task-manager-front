import { NavLink } from 'react-router-dom';

import FormWrapper from '../../shared/FormWrapper';
import RegForm from '../../components/RegForm';

const Registration = () => {
  return (
    <section>
      <div className="container">
        <h2>Register form</h2>
        <FormWrapper>
          <RegForm />
        </FormWrapper>
        <p>Have account? </p>
        <NavLink to="/login">Please, login</NavLink>
      </div>
    </section>
  );
};

export default Registration;

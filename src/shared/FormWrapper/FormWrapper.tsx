import { FormWrapperProps } from './FormWrapper.props';

const FormWrapper = (prop: FormWrapperProps) => {
  return <div className="formWrapper">{prop.children}</div>;
};
export default FormWrapper;

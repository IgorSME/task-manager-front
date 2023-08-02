import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';

const Header = () => {
  return (
    <header>
      <div className='container'>
      <NavLink to={'/'}>
        <Logo />
      </NavLink>
      </div>
    </header>
  );
};

export default Header;

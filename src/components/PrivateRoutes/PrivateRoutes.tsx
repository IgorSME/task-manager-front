import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const PrivateRoutes = () => {
const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);


  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoutes;
import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';

const PrivateRoute = () => {

	const { token } = useContext(GlobalContext);

	return token ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;
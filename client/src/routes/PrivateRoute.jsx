import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { DataContext } from '../context/DataContext';

const PrivateRoute = () => {

	const { token } = useContext(DataContext);

	return token ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;
import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';

const PublicRoute = () => {

	const { token } = useContext(GlobalContext);

	return !token ? <Outlet /> : <Navigate to='/transactions' />;
};

export default PublicRoute;
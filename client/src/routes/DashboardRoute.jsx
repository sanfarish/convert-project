import { Outlet } from 'react-router';
import Header from '../components/Header';
import Nav from '../components/Nav';
import ModalLayer from '../components/Layers/ModalLayer';
import ModalRoute from './ModalRoute';
import LoadLayer from '../components/Layers/LoadLayer';
import './DashboardRoute.css';

const DashboardRoute = () => {

	return (
		<>
			<div className='dashboard'>
				<Header />
				<Nav />
				<Outlet />
			</div>
			<ModalLayer />
			<ModalRoute />
			<LoadLayer />
		</>
	);
};

export default DashboardRoute;
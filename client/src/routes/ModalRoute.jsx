import { matchPath, useLocation } from 'react-router';
import TransactionModal from '../components/Modals/TransactionModal';
import AccountModal from '../components/Modals/AccountModal';
import CategoryModal from '../components/Modals/CategoryModal';
import './ModalRoute.css';

const ModalRoute = () => {

	const location = useLocation();

	const locationMatch = (path) => {
		return matchPath({
			path,
			exact: true,
			strict: true
		}, location.pathname);
	};

	const ModalRender = () => {
		if (locationMatch('/transactions')) {
			return <TransactionModal />;
		} else if (locationMatch('/accounts')) {
			return <AccountModal />;
		} else if (locationMatch('/categories')) {
			return <CategoryModal />;
		};
	};

	return <ModalRender />;
};

export default ModalRoute;
import { matchPath, useLocation } from 'react-router';
import small from '../logo-small.png';
import './Header.css';

const Header = () => {

	const location = useLocation();

	const locationMatch = (path) => {
		return matchPath({
			path: path,
			exact: true,
			strict: true
		}, location.pathname);
	};

	const Title = () => {
		if (locationMatch('/transactions')) {
			return 'TRANSACTIONS';
		} else if (locationMatch('/accounts')) {
			return 'ACCOUNTS';
		} else if (locationMatch('/categories')) {
			return 'CATEGORIES';
		} else {
			return 'NOT FOUND';
		};
	};

	return (
		<header className="head">
			<div className="head-title"><Title /></div>
			<div className="head-user">
				<div className='user-name'>{'Faris'}</div>
				<img className='user-avatar' src={small} alt="avatar" />
			</div>
		</header>
	);
};

export default Header;
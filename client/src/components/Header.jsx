import { useContext, useEffect } from 'react';
import { matchPath, useLocation } from 'react-router';
import { GlobalContext } from '../context/GlobalContext';
import { DataContext } from '../context/DataContext';
import avatar from '../avatar.png';
import './Header.css';

const Header = () => {

	const { token } = useContext(GlobalContext);
	const { user, setUser, getUser } = useContext(DataContext);
	const location = useLocation();

	useEffect(() => {
		const getData = async () => {
			const data = await getUser(token);
			if (data) {
				setUser(data);
			};
		};
		getData();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
				<div className='user-name'>{user.user_name ? user.user_name : 'No Data'}</div>
				<img data-testid='avatar-image' className='user-avatar' src={avatar} alt="avatar" />
			</div>
		</header>
	);
};

export default Header;
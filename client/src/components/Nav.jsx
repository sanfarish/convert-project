import { useContext } from 'react';
import { NavLink, matchPath, useLocation } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';
import standard from '../logo-standard.png';
import small from '../logo-small.png';
import './Nav.css';

const Nav = () => {

	const { setToken } = useContext(GlobalContext);
	const location = useLocation();
	const styleOpened = { backgroundColor: 'black', color: 'crimson' };

	const locationMatch = (path) => {
		return matchPath({
			path,
			exact: true,
			strict: true
		}, location.pathname);
	};

	const handleLogout = () => {
		localStorage.removeItem('accessToken');
		setToken(localStorage.getItem('accessToken'));
	};

	return (
		<nav className='navbar'>
			<ul className='navbar-nav'>
				<li className='logo'>
					<div className='nav-logo'>
						<img className='logo-small' src={small} alt="logo" />
						<img className='logo-standard' src={standard} alt="expense-manager" />
					</div>
				</li>
				<li className='nav-item'>
					<NavLink to="/transactions" className='nav-link' style={locationMatch('/transactions') && styleOpened}>
						<i className="fa-solid fa-handshake"></i>
						<span className='link-text'>Transactions</span>
					</NavLink>
				</li>
				<li className='nav-item'>
					<NavLink to="/accounts" className='nav-link' style={locationMatch('/accounts') && styleOpened}>
						<i className="fa-solid fa-sack-dollar"></i>
						<span className='link-text'>Accounts</span>
					</NavLink>
				</li>
				<li className='nav-item'>
					<NavLink to="/categories" className='nav-link' style={locationMatch('/categories') && styleOpened}>
						<i className="fa-solid fa-shapes"></i>
						<span className='link-text'>Categories</span>
					</NavLink>
				</li>
				<li className='nav-item'>
					<NavLink to="/login" className='nav-link' onClick={handleLogout}>
						<i className="fa-solid fa-right-from-bracket"></i>
						<span className='link-text'>Logout</span>
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default Nav;
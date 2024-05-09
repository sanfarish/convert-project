import { NavLink } from 'react-router-dom';
import standard from '../logo-standard.png';
import small from '../logo-small.png';
import './Nav.css';
import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';

const Nav = () => {

	const { page } = useContext(GlobalContext);

	const handleLogout = () => {
		localStorage.removeItem('accessToken');
	};

	const styleOpened = { backgroundColor: 'black', color: 'crimson' };

	return (
		<nav className='navbar'>
			<ul className='navbar-nav'>
				<li className='logo'>
					<div className='nav-logo'>
						<img className='logo-small' src={small} alt="LOGO" />
						<img className='logo-standard' src={standard} alt="EXPENSE MANAGER" />
					</div>
				</li>
				<li className='nav-item'>
					<NavLink to="/transactions" className='nav-link' style={page === 'trans' ? styleOpened : {}}>
						<i className="fa-solid fa-handshake"></i>
						<span className='link-text'>Transactions</span>
					</NavLink>
				</li>
				<li className='nav-item'>
					<NavLink to="/accounts" className='nav-link' style={page === 'acc' ? styleOpened : {}}>
						<i className="fa-solid fa-sack-dollar"></i>
						<span className='link-text'>Accounts</span>
					</NavLink>
				</li>
				<li className='nav-item'>
					<NavLink to="/categories" className='nav-link' style={page === 'cat' ? styleOpened : {}}>
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
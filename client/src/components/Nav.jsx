import { NavLink } from 'react-router-dom';
import logo from '../logo.png';

const Nav = () => {
	return (
		<nav>
			<div className='logo'>
				<img src={logo} alt='Expense Manager' />
			</div>
			<div className="menu">
				<ul>
					<li>
						<NavLink to="/transactions" style={{color: 'white', textDecoration: 'none'}}>
							<i className="fa-solid fa-list-ul" style={{display: 'inline-block', width: '30px'}}></i>
							<span >Transactions</span>
						</NavLink>
					</li>
					<li>
						<NavLink to="/accounts" style={{color: 'white', textDecoration: 'none'}}>
							<i className="fa-solid fa-database" style={{display: 'inline-block', width: '30px'}}></i>
							<span>Accounts</span>
						</NavLink>
					</li>
					<li>
						<NavLink to="/categories" style={{color: 'white', textDecoration: 'none'}}>
							<i className="fa-solid fa-layer-group" style={{display: 'inline-block', width: '30px'}}></i>
							<span>Categories</span>
						</NavLink>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Nav;
import { NavLink } from 'react-router-dom';
import Logo from '../../logo.png'

function Nav() {
	return (
		<nav className="sidebar">
			<div className="logo">
				<img src={Logo} alt='Expense Manager' />
			</div>
			<div className="menu">
				<ul>
					<li>
						<NavLink to="/transactions">
							<i className="fa-solid fa-list-ul"></i>
							<span>Transactions</span>
						</NavLink>
					</li>
					<li>
						<NavLink to="/accounts">
							<i className="fa-solid fa-database"></i>
							<span>Accounts</span>
						</NavLink>
					</li>
					<li>
						<NavLink to="/categories">
							<i className="fa-solid fa-layer-group"></i>
							<span>Categories</span>
						</NavLink>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Nav;
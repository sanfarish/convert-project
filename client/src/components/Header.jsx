import './Header.css';
import small from '../logo-small.png';

const Header = (props) => {

	return (
		<header className="head">
			<div className="head-title">{props.Title}</div>
			<div className="head-user">
				<div className='user-name'>{'Faris'}</div>
				<img className='user-avatar' src={small} alt="avatar" />
			</div>
		</header>
	);
};

export default Header;
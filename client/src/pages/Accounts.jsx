import { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { AccountsContext} from '../context/AccountsContext';
import Title from '../components/Title';
import Header from '../components/dashboard/Header';
import Nav from '../components/dashboard/Nav';
import Main from '../components/dashboard/main/MainAccounts';
import Popup from '../components/dashboard/popup/PopupAccounts';

function Accounts() {
	Title('Accounts | Expense Manager');
	const { popup } = useContext(AccountsContext);
	function popupBlur() {
		return popup ? "blur" : "";
	};
	return (
		<div className='accounts'>
			{ <Helmet>
				<link rel="stylesheet" href="/css/dashboard.css" />
				<link rel="stylesheet" href="/css/accounts/main.css" />
				<link rel="stylesheet" href="/css/accounts/table.css" />
				<link rel="stylesheet" href="/css/accounts/popup.css" />
			</Helmet> }
			<div className={`view ${popupBlur()}`}>
				<Header Title="Accounts" />
				<Main />
				<Nav />
			</div>
			<Popup />
		</div>
	);
};

export default Accounts;
import { useContext, useEffect } from 'react';
import { AccountsContext} from '../context/AccountsContext';
import '../css/dashboard.css';
import '../css/accounts/main.css';
import '../css/accounts/popup.css';
import '../css/accounts/table.css';
import Header from '../components/dashboard/Header';
import Nav from '../components/dashboard/Nav';
import Main from '../components/dashboard/main/MainAccounts';
import Popup from '../components/dashboard/popup/PopupAccounts';

const Accounts = () => {

	const { popup } = useContext(AccountsContext);

	useEffect(() => {
		document.title = 'Accounts | Expense Manager';
	}, []);

	function popupBlur() {
		return popup ? 'blur' : '';
	};

	return (
		<div className='accounts'>
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
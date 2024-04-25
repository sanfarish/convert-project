import { useContext, useEffect } from 'react';
import { AccountsContext} from '../context/AccountsContext';
import '../css/dashboard.css';
import '../css/accounts/main.css';
import '../css/accounts/popup.css';
import '../css/accounts/table.css';
import Header from '../components/dashboard/Header';
import Nav from '../components/dashboard/Nav';
import Main from '../components/dashboard/main/MainAccounts';
import Popup from '../components/popup/PopupAccounts';

const Accounts = () => {

	const { popup } = useContext(AccountsContext);
	const styleBlur = {
		filter: 'blur(2px) brightness(75%)',
		transition: '0.4s',
		pointerEvents: 'none',
		userSelect: 'none'
	};

	useEffect(() => {
		document.title = 'Accounts | Expense Manager';
	}, []);

	return (
		<div className='accounts'>
			<div className='dashboard' style={popup ? styleBlur : {}}>
				<Header Title="Accounts" />
				<Main />
				<Nav />
			</div>
			<Popup />
		</div>
	);
};

export default Accounts;
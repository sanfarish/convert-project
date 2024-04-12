import { useContext, useEffect } from 'react';
import { TransactionsContext } from '../context/TransactionsContext';
import '../css/dashboard.css';
import '../css/transactions/main.css';
import '../css/transactions/popup.css';
import '../css/transactions/table.css';
import Header from '../components/dashboard/Header';
import Nav from '../components/dashboard/Nav';
import Main from '../components/dashboard/main/MainTransactions';
import Popup from '../components/dashboard/popup/PopupTransactions';

const Transactions = () => {

	const { popup } = useContext(TransactionsContext);

	useEffect(() => {
		document.title = 'Transactions | Expense Manager';
	}, []);

	function popupBlur() {
		return popup ? 'blur' : '';
	};

	return (
		<div className='transactions'>
			{/* <meta name="google" content="notranslate" /> */}
			<div className={`view ${popupBlur()}`}>
				<Header Title="Transactions" />
				<Main />
				<Nav />
			</div>
			<Popup />
		</div>
	);
};

export default Transactions;
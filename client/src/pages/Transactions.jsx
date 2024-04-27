import { useContext, useEffect } from 'react';
import { TransactionsContext } from '../context/TransactionsContext';
import '../css/dashboard.css';
import '../css/transactions/main.css';
import '../css/transactions/popup.css';
import '../css/transactions/table.css';
import Header from '../components/dashboard/Header';
import Nav from '../components/dashboard/Nav';
import Main from '../components/dashboard/main/MainTransactions';
import Popup from '../components/popup/PopupTransactions';

const Transactions = () => {

	const { popup } = useContext(TransactionsContext);
	const styleBlur = {
		filter: 'blur(2px) brightness(75%)',
		transition: '0.4s',
		pointerEvents: 'none',
		userSelect: 'none'
	};

	useEffect(() => {
		document.title = 'Transactions | Expense Manager';
	}, []);

	return (
		<div className='transactions'>
			<div className='dashboard' style={popup ? styleBlur : {}}>
				<Header Title="Transactions" />
				<Main />
				<Nav />
			</div>
			<Popup />
		</div>
	);
};

export default Transactions;
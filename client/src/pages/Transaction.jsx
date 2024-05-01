import { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import Header from '../components/Header';
import Nav from '../components/Nav';
import TransactionTable from '../components/Tables/TransactionTable';
import TransactionAdd from '../components/Buttons/TransactionAdd';
import TransactionSum from '../components/Summaries/TransactionSum';
import TransactionModal from '../components/Modals/TransactionModal';
import '../css/transactions/dashboard.css';
import '../css/transactions/table.css';
import '../css/transactions/button.css';
import '../css/transactions/summary.css';
import '../css/transactions/modal.css';

const Transactions = () => {

	const { modal } = useContext(GlobalContext);
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
			<div className='dashboard' style={modal ? styleBlur : {}}>
				<Header Title="Transactions" />
				<main>
					<TransactionTable />
					<TransactionAdd />
					<TransactionSum />
				</main>
				<Nav />
			</div>
			<TransactionModal />
		</div>
	);
};

export default Transactions;
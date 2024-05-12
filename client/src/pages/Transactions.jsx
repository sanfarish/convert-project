import { useEffect } from 'react';
import TransactionTable from '../components/Tables/TransactionTable';
import TransactionAdd from '../components/Buttons/TransactionAdd';
import TransactionSum from '../components/Summaries/TransactionSum';
import './Transactions.css';

const Transactions = () => {

	useEffect(() => {
		document.title = 'Transactions | Expense Manager';
	}, []);

	return (
		<main className='transactions'>
			<TransactionTable />
			<TransactionAdd />
			<TransactionSum />
		</main>
	);
};

export default Transactions;
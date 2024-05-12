import { useEffect } from 'react';
import AccountTable from '../components/Tables/AccountTable';
import AccountAdd from '../components/Buttons/AccountAdd';
import AccountSum from '../components/Summaries/AccountSum';
import './Accounts.css';

const Accounts = () => {

	useEffect(() => {
		document.title = 'Accounts | Expense Manager';
	}, []);

	return (
		<main className='accounts'>
			<AccountTable />
			<AccountAdd />
			<AccountSum />
		</main>
	);
};

export default Accounts;
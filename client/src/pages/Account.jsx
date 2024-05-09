import { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import Header from '../components/Header';
import Nav from '../components/Nav';
import AccountTable from '../components/Tables/AccountTable';
import AccountAdd from '../components/Buttons/AccountAdd';
import AccountSum from '../components/Summaries/AccountSum';
import AccountModal from '../components/Modals/AccountModal';
import Loader from '../components/Loader';
// import '../css/accounts/dashboard.css';
// import '../css/accounts/table.css';
// import '../css/accounts/button.css';
// import '../css/accounts/summary.css';
// import '../css/accounts/modal.css';

const Accounts = () => {

	const { modal } = useContext(GlobalContext);
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
			<div className='dashboard' style={modal ? styleBlur : {}}>
				<Header Title="Accounts" />
				<Nav />
				<main>
					<AccountTable />
					<AccountAdd />
					<AccountSum />
				</main>
			</div>
			<AccountModal />
			<Loader />
		</div>
	);
};

export default Accounts;
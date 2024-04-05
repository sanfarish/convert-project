import { Helmet } from 'react-helmet';
import Header from '../components/dashboard/Header';
import Nav from '../components/dashboard/Nav';
import Main from '../components/dashboard/main/MainTransactions';
import Popup from '../components/dashboard/popup/PopupTransactions';
import Title from '../components/Title';

function Transactions() {
	Title('Transactions | Expense Manager');
	return (
		<div className='transactions'>
			{
				<Helmet>
					<meta name="google" content="notranslate" />
					<link rel="stylesheet" href="/css/dashboard.css" />
					<link rel="stylesheet" href="/css/transactions/main.css" />
					<link rel="stylesheet" href="/css/transactions/table.css" />
					<link rel="stylesheet" href="/css/transactions/popup.css" />
				</Helmet>
			}
			<div className="view">
				<Header Title="Transactions" />
				<Main />
				<Nav />
			</div>
			<Popup />
		</div>
	);
};

export default Transactions;
import { createContext, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { getTransactions, postTransaction, putTransaction, deleteTransaction } from '../apis/FetchTransactions';
import { getAccounts, putAccount } from '../apis/FetchAccounts';
import { getIncomes } from '../apis/FetchIncomes';
import { getExpenses } from '../apis/FetchExpenses';

const TransactionsContext = createContext();

const TransactionsContextProvider = (props) => {

	const [transactions, setTransactions] = useState([]);
	const [popup, setPopup] = useState(false);
	const [popupAdd, setPopupAdd] = useState(true);
	const [formType, setFormType] = useState('expense');
	const [popupInput, setPopupInput] = useState({
		transaction_id: '',
		transaction_time: '',
		id_account: '',
		id_income: '',
		id_expense: '',
		id_transfer: '',
		transaction_amount: 0,
		transaction_note: '',
	});
	const [accounts, setAccounts] = useState([]);
	const [incomes, setIncomes] = useState([]);
	const [expenses, setExpenses] = useState([]);

	const datetimeFormat = (date) => {
		let local = new Date(date);
		let offset = local.getTimezoneOffset();
		let utc = new Date(local.getTime() - offset * 60000).toISOString().slice(0, 16);
		return utc;
	};

	const getTransactionsData = async() => {
		const data = await getTransactions();
		setTransactions(data);
	};

	const postTransactionData = async(body) => {
		await postTransaction(body);
		await getTransactionsData();
	};

	const putTransactionData = async(id, body) => {
		await putTransaction(id, body);
		await getTransactionsData();
	};

	const deleteTransactionData = async(id) => {
		await deleteTransaction(id);
		await getTransactionsData();
	};

	const getAccountsData = async() => {
		const data = await getAccounts();
		setAccounts(data);
	};

	const putAccountData = async(id, body) => {
		await putAccount(id, body);
		await getAccountsData();
	};

	const getIncomesData = async() => {
		const data = await getIncomes();
		setIncomes(data);
	};

	const getExpensesData = async() => {
		const data = await getExpenses();
		setExpenses(data);
	};

	return (
		<TransactionsContext.Provider
			value={{
				transactions,
				setTransactions,
				popup,
				setPopup,
				popupAdd,
				setPopupAdd,
				formType,
				setFormType,
				popupInput,
				setPopupInput,
				datetimeFormat,
				getTransactionsData,
				postTransactionData,
				putTransactionData,
				deleteTransactionData,
				accounts,
				incomes,
				expenses,
				getAccountsData,
				putAccountData,
				getIncomesData,
				getExpensesData
			}}
		>
			{props.children}
		</TransactionsContext.Provider>
	);
};

export { TransactionsContext, TransactionsContextProvider };
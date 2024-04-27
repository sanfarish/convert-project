import { createContext, useState } from 'react';
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
		return data;
	};

	const putAccountData = async(id, body) => {
		await putAccount(id, body);
		const data = await getAccountsData();
		return data;
	};

	const getIncomesData = async() => {
		const data = await getIncomes();
		setIncomes(data);
	};

	const getExpensesData = async() => {
		const data = await getExpenses();
		setExpenses(data);
	};

	const datetimeFormat = (date) => {
		let local = new Date(date);
		let offset = local.getTimezoneOffset();
		let utc = new Date(local.getTime() - offset * 60000).toISOString().slice(0, 16);
		return utc;
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
				accounts,
				incomes,
				expenses,
				getTransactionsData,
				postTransactionData,
				putTransactionData,
				deleteTransactionData,
				getAccountsData,
				putAccountData,
				getIncomesData,
				getExpensesData,
				datetimeFormat
			}}
		>
			{props.children}
		</TransactionsContext.Provider>
	);
};

export { TransactionsContext, TransactionsContextProvider };
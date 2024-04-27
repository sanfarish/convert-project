import { createContext, useState } from 'react';
import { getAccounts, postAccount, putAccount, deleteAccount } from '../apis/FetchAccounts';
import { getTransactions } from '../apis/FetchTransactions';

const AccountsContext = createContext();

const AccountsContextProvider = (props) => {

	const [accounts, setAccounts ] = useState([]);
	const [popup, setPopup] = useState(false);
	const [popupAdd, setPopupAdd] = useState(true);
	const [formType, setFormType] = useState('empty');
	const [popupInput, setPopupInput] = useState({
		account_id: '',
		account_name: ''
	});
	const [transactions, setTransactions] = useState([]);

	const getAccountsData = async() => {
		const data = await getAccounts();
		setAccounts(data);
	};

	const postAccountData = async(body) => {
		await postAccount(body);
		await getAccountsData();
	};

	const putAccountData = async(id, body) => {
		await putAccount(id, body);
		await getAccountsData();
	};

	const deleteAccountData = async(id) => {
		await deleteAccount(id);
		await getAccountsData();
	};

	const getTransactionsData = async() => {
		const data = await getTransactions();
		setTransactions(data);
	};

	return (
		<AccountsContext.Provider
		value={{
			accounts,
			popup,
			setPopup,
			popupAdd,
			setPopupAdd,
			formType,
			setFormType,
			popupInput,
			setPopupInput,
			transactions,
			getAccountsData,
			postAccountData,
			putAccountData,
			deleteAccountData,
			getTransactionsData
		}}>
			{props.children}
		</AccountsContext.Provider>
	);
};

export { AccountsContext, AccountsContextProvider };
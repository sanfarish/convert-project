import { createContext, useState } from 'react';
import { getAccounts, postAccount, putAccount, deleteAccount } from '../apis/FetchAccounts';
import { getTransactions } from '../apis/FetchTransactions';

const AccountsContext = createContext();

function AccountsContextProvider(props) {

	const [accounts, setAccounts ] = useState([]);
	const [updateID, setUpdateID] = useState("");
	const [popup, setPopup] = useState(false);
	const [popupType, setPopupType] = useState("");
	const [popupInput, setPopupInput] = useState("");
	const [transactions, setTransactions] = useState([]);

	async function getAccountsData() {
		const data = await getAccounts();
		setAccounts(data);
	};

	async function postAccountData(body) {
		await postAccount(body);
		await getAccountsData();
	};

	async function updateAccountData(body, id) {
		await putAccount(body, id);
		await getAccountsData();
	};

	async function deleteAccountData(id) {
		await deleteAccount(id);
		await getAccountsData();
	};

	async function getTransactionsData() {
		const data = await getTransactions();
		setTransactions(data);
	};

	return (
		<AccountsContext.Provider
		value={{
			accounts,
			updateID,
			setUpdateID,
			popup,
			setPopup,
			popupType,
			setPopupType,
			popupInput,
			setPopupInput,
			getAccountsData,
			postAccountData,
			updateAccountData,
			deleteAccountData,
			transactions,
			getTransactionsData
		}}>
			{props.children}
		</AccountsContext.Provider>
	);
};

export { AccountsContext, AccountsContextProvider };
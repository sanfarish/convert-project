import { createContext, useState } from 'react';
import { getAccounts, postAccount, putAccount, deleteAccount } from '../apis/FetchAccounts';

const AccountsContext = createContext();

function AccountsContextProvider(props) {
	const [accounts, setAccounts ] = useState([]);
	const [popup, setPopup] = useState(false);
	const [popupType, setPopupType] = useState("");
	const [popupInput, setPopupInput] = useState("");
	async function getAccountsData() {
		const data = await getAccounts();
		setAccounts(data);
	};
	async function postAccountData(body) {
		await postAccount(body);
		await getAccountsData();
	};
	async function putAccountData(body, id) {
		await putAccount(body, id);
		await getAccountsData();
	};
	async function deleteAccountData(id) {
		await deleteAccount(id);
		await getAccountsData();
	};
	return (
		<AccountsContext.Provider
		value={{
			accounts,
			setAccounts,
			popup,
			setPopup,
			popupType,
			setPopupType,
			popupInput,
			setPopupInput,
			getAccountsData,
			postAccountData,
			putAccountData,
			deleteAccountData
		}}>
			{props.children}
		</AccountsContext.Provider>
	);
};

export { AccountsContext, AccountsContextProvider };
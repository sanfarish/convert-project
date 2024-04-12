import { createContext, useState } from 'react';
import { getTransactions } from '../apis/FetchTransactions';

const TransactionsContext = createContext();

const TransactionsContextProvider = (props) => {

	const [transactions, setTransactions] = useState([]);
	const [popup, setPopup] = useState(false);
	const [popupType, setPopupType] = useState('');
	const [popupInput, setPopupInput] = useState('');

	async function getTransactionsData() {
		const data = await getTransactions();
		setTransactions(data);
	};

	return (
		<TransactionsContext.Provider
			value={{
				transactions,
				setTransactions,
				popup,
				setPopup,
				popupType,
				setPopupType,
				popupInput,
				setPopupInput,
				getTransactionsData
			}}
		>
			{props.children}
		</TransactionsContext.Provider>
	);
};

export { TransactionsContext, TransactionsContextProvider };
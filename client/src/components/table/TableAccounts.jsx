import { useContext, useEffect, useState } from 'react';
import { AccountsContext } from '../../context/AccountsContext';

function TableAccounts() {
	const {
		accounts,
		setUpdateID,
		setPopup,
		setPopupType,
		setPopupInput,
		getAccountsData,
		deleteAccountData,
		transactions,
		getTransactionsData
	} = useContext(AccountsContext);
	const [transactionsAccount, setTransactionsAccount] = useState([]);

	useEffect(() => {
		getAccountsData();
		getTransactionsData();
		transactions.map(item => {
			setTransactionsAccount(prev => [...prev, item.id_account]);
			if (item.id_transfer) {
				setTransactionsAccount(prev => [...prev, item.id_transfer]);
			};
		})
	}, []);

	function editPopup(id, name) {
		setPopup(true);
		setPopupType("edit");
		setPopupInput(name);
		setUpdateID(id);
	};

	function handleDeleteAccount(id) {
		if (transactionsAccount.includes(id)) {
			alert('Cannot delete account that is in use on transactions!');
		} else {
			deleteAccountData(id);
		};
	};

	function Item({acc_id, acc_name, acc_bal}) {
		if (acc_id !== "") {
			return(
				<>
					<div className={`id ${acc_bal > 0 ? 'assets' : acc_bal < 0 ? 'liabilities' : 'empty'}`}>
						<div className="account">{acc_name}</div>
						<div className="amount">Rp {(acc_bal > 0 ? acc_bal : acc_bal < 0 ? acc_bal * -1 : 0).toLocaleString()},-</div>
						<div className="edit-wrapper">
							<button className="edit-btn" onClick={() => editPopup(acc_id, acc_name)}>Edit</button>
						</div>
						<div className="del-wrapper">
							<button className="del-btn" onClick={() => {handleDeleteAccount(acc_id)}}>Delete</button>
						</div>
					</div>
					<div className="space"></div>
				</>
			);
		};
	};

	return (
		accounts && accounts.map(item => {
			return(
				<Item
					acc_id={item.account_id}
					acc_name={item.account_name}
					acc_bal={item.account_balance}
					key={item.account_id}
				/>
			);
		})
	);
};

export default TableAccounts;
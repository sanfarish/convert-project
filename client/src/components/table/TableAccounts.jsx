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
		transactions
	} = useContext(AccountsContext);
	const [transactionsAccount, setTransactionsAccount] = useState([]);

	useEffect(() => {
	
		getAccountsData();
		setTransactionsAccount([]);
	
		transactions.forEach(item => {
			setTransactionsAccount(prev => [...prev, item.id_account]);
			if (item.id_transfer) {
				setTransactionsAccount(prev => [...prev, item.id_transfer]);
			};
		});
	
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [transactions]);

	const editPopup = (id, name) => {
		setPopup(true);
		setPopupType("edit");
		setPopupInput(name);
		setUpdateID(id);
	};

	const handleDeleteAccount = (id) => {
		if (transactionsAccount.includes(id)) {
			alert('Cannot delete account that is in use on transactions!');
		} else {
			deleteAccountData(id);
		};
	};

	const Render = ({Id, Name, Bal}) => {
		if (Id !== "") {
			return(
				<>
					<div className={`id ${Bal > 0 ? 'assets' : Bal < 0 ? 'liabilities' : 'empty'}`}>
						<div className="account">{Name}</div>
						<div className="amount">Rp {(Bal > 0 ? Bal : Bal < 0 ? Bal * -1 : 0).toLocaleString()},-</div>
						<div className="edit-wrapper">
							<button className="edit-btn" onClick={() => editPopup(Id, Name)}>Edit</button>
						</div>
						<div className="del-wrapper">
							<button className="del-btn" onClick={() => {handleDeleteAccount(Id)}}>Delete</button>
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
				<Render
					Id={item.account_id}
					Name={item.account_name}
					Bal={item.account_balance}
					key={item.account_id}
				/>
			);
		})
	);
};

export default TableAccounts;
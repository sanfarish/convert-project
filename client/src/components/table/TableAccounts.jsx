import { useContext, useEffect } from 'react';
import { AccountsContext } from '../../context/AccountsContext';

function TableAccounts() {
	const {
		accounts,
		setPopup,
		setPopupType,
		setPopupInput,
		getAccountsData,
		deleteAccountData
	} = useContext(AccountsContext);
	// assetsTotal += item.account_balance;
	// liabilitiesTotal += item.account_balance * -1;

	useEffect(() => {
		getAccountsData();
	}, []);

	function editPopup(id, name) {
		setPopup(true);
		setPopupType("edit");
		console.log(id);
		setPopupInput(name);
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
							{/* <button className="del-btn" onClick={deleteAccount(item.account_id)}>Delete</button> */}
							<button className="del-btn" onClick={() => {deleteAccountData()}}>Delete</button>
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
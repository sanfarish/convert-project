import { useContext, useEffect, useState } from 'react';
import { AccountsContext } from '../../../context/AccountsContext';

function PopupAccounts() {
	const {
		accounts,
		updateID,
		popup,
		popupInput,
		popupType,
		setPopup,
		setPopupInput,
		postAccountData,
		updateAccountData
	} = useContext(AccountsContext);
	const [accountsName, setAccountsName] = useState([]);

	useEffect(() => {
		setAccountsName([]);
		accounts.forEach(item => {
			if (item.account_name !== '') {
				setAccountsName(prev => [...prev, item.account_name]);
			};
		});
	}, [accounts]);

	function closePopup() {
		setPopup(false);
	};

	const handleAddAccount = async() => {
		if (popupInput.trim() === '') {
			alert('Name cannot being empty!');
		} else {
			if (accountsName.includes(popupInput)) {
				alert('There are already account with that name! Change with another unique name!');
			} else {
				await postAccountData(popupInput.trim());
				setPopup(false);
			};
		};
	};

	const handleEditAccount = async() => {
		if (popupInput.trim() === '') {
			alert('Name cannot being empty!');
		} else {
			if (accountsName.includes(popupInput)) {
				alert('There are already account with that name! Change with another unique name!');
			} else {
				await updateAccountData(popupInput.trim(), updateID);
				setPopup(false);
			};
		};
	};

	return (
		<div className={`popup ${popup ? "active" : ""} ${popupType}`}>
			<button id="close-btn" onClick={closePopup}>x</button>
			<div className="form">
				<div className="form-header">
					<header>Add Account:</header>
					<header>Edit Account:</header>
				</div>
				<div className="form-content">
					<div className="form-input">
						<label htmlFor="name">Name:</label>
						<input
							type="text"
							id="name"
							value={popupInput}
							onChange={(e) => setPopupInput(e.target.value)}
							autoComplete='name'
						/>
					</div>
				</div>
				<button id="save-add-btn" onClick={handleAddAccount}>Add</button>
				<button id="save-edit-btn" onClick={handleEditAccount}>Edit</button>
			</div>
		</div>
	);
};

export default PopupAccounts;
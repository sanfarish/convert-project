import { useContext, useEffect, useState } from 'react';
import { AccountsContext } from '../../context/AccountsContext';

const PopupAccounts = () => {
	const {
		accounts,
		popup,
		setPopup,
		popupAdd,
		formType,
		popupInput,
		setPopupInput,
		postAccountData,
		putAccountData
	} = useContext(AccountsContext);
	const [accountsName, setAccountsName] = useState([]);
	const stylePopup = {
		opacity: '1',
		top: '50%',
		transform: 'translate(-50%, -50%) scale(1)',
		transition: 'opacity 0.2s ease-in-out, top 0s ease-in-out, transform 0.2s ease-in-out'
	};

	useEffect(() => {
		setAccountsName([]);
		accounts && accounts.forEach(item => {
			if (item.account_name !== '') {
				setAccountsName(prev => [...prev, item.account_name]);
			};
		});
	}, [accounts]);

	const handleSubmit = (e) => {

		e.preventDefault();
		const formAccount = new FormData(e.target);
		formAccount.append('id_user', '08b680c7-3c47-485c-ba81-cf58821cbd7c');

		if (popupAdd) {
			if (popupInput.account_name.trim() === '') {
				alert('Name cannot being empty!');
			} else {
				if (accountsName.includes(popupInput.account_name)) {
					alert('There are already account with that name! Change with another unique name!');
				} else {
					postAccountData(formAccount);
					setPopup(false);
				};
			};
		}

		else {
			if (popupInput.account_name.trim() === '') {
				alert('Name cannot being empty!');
			} else {
				if (accountsName.includes(popupInput.account_name)) {
					alert('There are already account with that name! Change with another unique name!');
				} else {
					putAccountData(popupInput.account_id, formAccount);
					setPopup(false);
				};
			};
		};
	};

	return (
		<div className='popup' style={popup ? stylePopup : {}}>

			<button onClick={() => setPopup(false)}>{'\u2716'}</button>

			<div className="form-header">
				{popupAdd ? 'Add Account:' : 'Edit Account:'}
			</div>

			<form onSubmit={handleSubmit}>

				<label>
					Name:
					<input
						type="text"
						name='account_name'
						autoComplete='name'
						value={popupInput.account_name}
						onChange={(e) => setPopupInput({...popupInput, account_name: e.target.value})}
					/>
				</label>

				<button
				type='submit'
					style={
						formType === 'assets'
						? {backgroundColor: '#1999FC'}
						: formType === 'liabilities'
						? {backgroundColor: '#FF6255'}
						: formType === 'empty'
						&& {backgroundColor: '#888888'}
					}
				>{popupAdd ? 'Add' : 'Save'}</button>

			</form>

		</div>
	);
};

export default PopupAccounts;
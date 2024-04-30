import React, { useContext, useEffect } from 'react';
import { TransactionsContext } from '../../context/TransactionsContext';

function PopupTransactions() {

	const {
		popup,
		setPopup,
		popupAdd,
		formType,
		setFormType,
		popupInput,
		setPopupInput,
		accounts,
		incomes,
		expenses,
		getAccountsData,
		getIncomesData,
		getExpensesData,
		postTransactionData,
		putTransactionData
	} = useContext(TransactionsContext);
	const stylePopup = {
		opacity: '1',
		top: '50%',
		transform: 'translate(-50%, -50%) scale(1)',
		transition: 'opacity 0.2s ease-in-out, top 0s ease-in-out, transform 0.2s ease-in-out'
	};

	useEffect(() => {
		getAccountsData();
		getIncomesData();
		getExpensesData();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const emptyInputHandler = (form) => {
		return (
			popupInput.transaction_time === ''
			|| popupInput.id_account === ''
			|| form.get('id_income') === ''
			|| form.get('id_expense') === ''
			|| form.get('id_transfer') === ''
			|| popupInput.transaction_amount === ''
			|| Number(popupInput.transaction_amount) === 0
		);
	};

	const handleSubmit = (e) => {

		e.preventDefault();
		const formTrans = new FormData(e.target);

		if (emptyInputHandler(formTrans)) {
			alert('Please fill required input with appropriate value!');
		} else {
			if (popupAdd) {
				if (formType === 'income' || formType === 'expense') {
					postTransactionData(formTrans);
					setPopup(false);
				} else if (formType === 'transfer') {
					if (popupInput.id_account === popupInput.id_transfer) {
						alert('"From" account and "To" account cannot be the same!');
					} else {
						postTransactionData(formTrans);
						setPopup(false);
					};
				};
			} else {
				if (formType === 'income' || formType === 'expense') {
					putTransactionData(popupInput.transaction_id, formTrans);
					setPopup(false);
				} else if (formType === 'transfer') {
					if (popupInput.id_account === popupInput.id_transfer) {
						alert('"From" account and "To" account cannot be the same!');
					} else {
						putTransactionData(popupInput.transaction_id, formTrans);
					};
				};
			};
		};

	};

	return (
		<div className='popup' style={popup ? stylePopup : {}}>

			<button onClick={() => setPopup(false)}>{'\u2716'}</button>

			<div className='form-header'>
				<button
					onClick={() => {
						setFormType('income');
						popupInput.id_expense = '';
						popupInput.id_transfer = '';
					}}
					style={formType === 'income' ? {backgroundColor: '#1999FC'} : {}}
				>Income</button>
				<button
					onClick={() => {
						setFormType('expense');
						popupInput.id_income = '';
						popupInput.id_transfer = '';
					}}
					style={formType === 'expense' ? {backgroundColor: '#FF6255'} : {}}
					>Expense</button>
				<button
					onClick={() => {
						setFormType('transfer');
						popupInput.id_income = '';
						popupInput.id_expense = '';
					}}
					style={formType === 'transfer' ? {backgroundColor: 'white', color: 'black'} : {}}
				>Transfer</button>
			</div>

			<form onSubmit={handleSubmit}>

				<label>
					Date/Time:
					<input
						type="datetime-local"
						name='transaction_time'
						autoComplete='datetime'
						value={popupInput.transaction_time}
						onChange={e => setPopupInput({...popupInput, transaction_time: e.target.value})}
					/>
				</label>

				<label>
					{formType === 'income' || formType === 'expense' ? 'Account:' : formType === 'transfer' && 'From:'}
					<select
						name='id_account'
						autoComplete='account'
						value={popupInput.id_account}
						onChange={e => setPopupInput({...popupInput, id_account: e.target.value})}
					>
						<option value="">-account-</option>
						{accounts.map(item => (
							item.account_id !== ''
							&& <option value={item.account_id} key={item.account_id}>{item.account_name}</option>
						))}
					</select>
				</label>

				{formType === 'income' && (
					<label>
						Category:
						<select
							name='id_income'
							autoComplete='income'
							value={popupInput.id_income}
							onChange={e => setPopupInput({...popupInput, id_income: e.target.value})}
						>
							<option value="">-category-</option>
							{incomes.map(item => (
								item.income_id !== ''
								&& <option value={item.income_id} key={item.income_id}>{item.income_name}</option>
							))}
						</select>
					</label>
				)}

				{formType === 'expense' && (
					<label>
						Category:
						<select
							name='id_expense'
							autoComplete='expense'
							value={popupInput.id_expense}
							onChange={e => setPopupInput({...popupInput, id_expense: e.target.value})}
						>
							<option value="">-category-</option>
							{expenses.map(item => (
								item.expense_id !== ''
								&& <option value={item.expense_id} key={item.expense_id}>{item.expense_name}</option>
							))}
						</select>
					</label>
				)}

				{formType === 'transfer' && (
					<label>
						To:
						<select
							name='id_transfer'
							autoComplete='transfer'
							value={popupInput.id_transfer}
							onChange={e => setPopupInput({...popupInput, id_transfer: e.target.value})}
						>
							<option value="">-account-</option>
							{accounts.map(item => (
								item.account_id !== ''
								&& <option value={item.account_id} key={item.account_id}>{item.account_name}</option>
							))}
						</select>
					</label>
				)}

				<label>
					Amount:
					<input
						type="number"
						name='transaction_amount'
						autoComplete='amount'
						value={popupInput.transaction_amount}
						onChange={e => setPopupInput({...popupInput, transaction_amount: e.target.value})}
					/>
				</label>

				<label>
					Note:
					<input
						type="text"
						name='transaction_note'
						autoComplete='note'
						value={popupInput.transaction_note}
						onChange={e => setPopupInput({...popupInput, transaction_note: e.target.value})}
					/>
				</label>

				<button
					type='submit'
					style={
						formType === 'income'
						? {backgroundColor: '#1999FC'}
						: formType === 'expense'
						? {backgroundColor: '#FF6255'}
						: formType === 'transfer'
						&& {backgroundColor: '#888888'}
					}
				>{popupAdd ? 'Add' : 'Save'}</button>

			</form>

		</div>
	);

};

export default PopupTransactions;
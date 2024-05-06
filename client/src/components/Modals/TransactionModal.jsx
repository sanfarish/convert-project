import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalContext';

const TransactionModal = () => {

	const {
		token,
		setTransactions,
		accounts,
		setAccounts,
		incomes,
		setIncomes,
		expenses,
		setExpenses,
		modal,
		setModal,
		modalType,
		modalAdd,
		modalForm,
		setModalForm,
		modalInput,
		setModalInput,
		getTransactions,
		postTransaction,
		putTransaction,
		getExpenses,
		getIncomes,
		getAccounts
	} = useContext(GlobalContext);
	const styleModal = {
		opacity: '1',
		top: '50%',
		transform: 'translate(-50%, -50%) scale(1)',
		transition: 'opacity 0.2s ease-in-out, top 0s ease-in-out, transform 0.2s ease-in-out'
	};

	useEffect(() => {
		const getData = async () => {
			const expenseData = await getExpenses(token);
			const incomeData = await getIncomes(token);
			const accountData = await getAccounts(token);
			setExpenses(expenseData);
			setIncomes(incomeData);
			setAccounts(accountData);
		};
		getData();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [token])

	const handleBill = () => {};

	const handleSubmit = async (e) => {
	
		e.preventDefault();
		const formTrans = new FormData(e.target);
	
		if (modalAdd) {
			const res = await postTransaction(formTrans);
			if (res.response) {
				alert(res.response.data.message);
			} else {
				const data = await getTransactions();
				setTransactions(data);
				setModal(false);
			};
		} else {
			const res = await putTransaction(modalInput.transaction_id, formTrans);
			if (res.response) {
				alert(res.response.data.message);
			} else {
				const data = await getTransactions();
				setTransactions(data);
				setModal(false);
			};
		};
	};

	return (
		<div className='modal' style={(modal && (modalType === 'transactions')) ? styleModal : {}}>

			<button onClick={() => setModal(false)}>{'\u2716'}</button>

			<div className='form-header'>
				<button
					onClick={() => {
						setModalForm('plus');
						modalInput.id_expense = '';
						modalInput.id_transfer = '';
					}}
					style={modalForm === 'plus' ? {backgroundColor: '#1999FC'} : {}}
				>Income</button>
				<button
					onClick={() => {
						setModalForm('minus');
						modalInput.id_income = '';
						modalInput.id_transfer = '';
					}}
					style={modalForm === 'minus' ? {backgroundColor: '#FF6255'} : {}}
					>Expense</button>
				<button
					onClick={() => {
						setModalForm('empty');
						modalInput.id_income = '';
						modalInput.id_expense = '';
					}}
					style={modalForm === 'empty' ? {backgroundColor: 'white', color: 'black'} : {}}
				>Transfer</button>
			</div>

			<form onSubmit={handleSubmit}>

				<label>
					Date/Time:
					<input
						type="datetime-local"
						name='transaction_time'
						autoComplete='datetime'
						value={modalInput.transaction_time}
						onChange={e => setModalInput({...modalInput, transaction_time: e.target.value})}
					/>
				</label>

				<label>
					{modalForm === 'plus' || modalForm === 'minus' ? 'Account:' : modalForm === 'empty' && 'From:'}
					<select
						name='id_account'
						autoComplete='account'
						value={modalInput.id_account}
						onChange={e => setModalInput({...modalInput, id_account: e.target.value})}
					>
						<option value="">-account-</option>
						{accounts && accounts.map(item => (
							item.account_id !== ''
							&& <option value={item.account_id} key={item.account_id}>{item.account_name}</option>
						))}
					</select>
				</label>

				{modalForm === 'plus' && (
					<label>
						Category:
						<select
							name='id_income'
							autoComplete='income'
							value={modalInput.id_income}
							onChange={e => setModalInput({...modalInput, id_income: e.target.value})}
						>
							<option value="">-category-</option>
							{incomes && incomes.map(item => (
								item.income_id !== ''
								&& <option value={item.income_id} key={item.income_id}>{item.income_name}</option>
							))}
						</select>
					</label>
				)}

				{modalForm === 'minus' && (
					<label>
						Category:
						<select
							name='id_expense'
							autoComplete='expense'
							value={modalInput.id_expense}
							onChange={e => setModalInput({...modalInput, id_expense: e.target.value})}
						>
							<option value="">-category-</option>
							{expenses && expenses.map(item => (
								item.expense_id !== ''
								&& <option value={item.expense_id} key={item.expense_id}>{item.expense_name}</option>
							))}
						</select>
					</label>
				)}

				{modalForm === 'empty' && (
					<label>
						To:
						<select
							name='id_transfer'
							autoComplete='transfer'
							value={modalInput.id_transfer}
							onChange={e => setModalInput({...modalInput, id_transfer: e.target.value})}
						>
							<option value="">-account-</option>
							{accounts && accounts.map(item => (
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
						value={modalInput.transaction_amount}
						onChange={e => setModalInput({...modalInput, transaction_amount: e.target.value})}
					/>
				</label>

				<label>
					Note:
					<input
						type="text"
						name='transaction_note'
						autoComplete='note'
						value={modalInput.transaction_note}
						onChange={e => setModalInput({...modalInput, transaction_note: e.target.value})}
					/>
				</label>

				<label>
					Upload bill
					<input
						type="file"
						name='transaction_bill'
						onChange={e => setModalInput({...modalInput, transaction_bill: e.target.files[0]})}
					/>
				</label>

				<button
					type='submit'
					style={
						modalForm === 'plus'
						? {backgroundColor: '#1999FC'}
						: modalForm === 'minus'
						? {backgroundColor: '#FF6255'}
						: modalForm === 'empty'
						&& {backgroundColor: '#888888'}
					}
				>{modalAdd ? 'Add' : 'Save'}</button>
			</form>

			{modalInput.transaction_bill !== '' && <button type="button" onClick={handleBill}>See uploaded bill</button>}
		</div>
	);
};

export default TransactionModal;
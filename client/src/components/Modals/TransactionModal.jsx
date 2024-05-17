import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { DataContext } from '../../context/DataContext';
import { message } from 'antd';
import './TransactionModal.css';

const TransactionModal = () => {

	const { token, setLoad } = useContext(GlobalContext);
	const {
		setTransactions,
		accounts,
		setAccounts,
		incomes,
		setIncomes,
		expenses,
		setExpenses,
		modal,
		setModal,
		modalAdd,
		modalForm,
		setModalForm,
		modalInput,
		setModalInput,
		inputFile,
		getTransactions,
		postTransaction,
		putTransaction,
		getExpenses,
		getIncomes,
		getAccounts
	} = useContext(DataContext);
	const [viewBill, setViewBill] = useState(false);
	const styleModal = {
		top: '50%',
        transition: 'top 400ms ease-out'
	};

	useEffect(() => {
		const getData = async () => {
			const expenseData = await getExpenses(token);
			const incomeData = await getIncomes(token);
			const accountData = await getAccounts(token);
			if (expenseData) {	
				setExpenses(expenseData);
			};
			if (incomeData) {
				setIncomes(incomeData);
			};
			if (accountData) {
				setAccounts(accountData);
			};
		};
		getData();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [token])

	const handleInputBill = (e) => {
		setModalInput({
			...modalInput,
			transaction_bill: e.target.type === 'file' ? e.target.files[0] : e.target.value
		});
	};

	const handleResetFile = () => {
		if (inputFile.current) {
			inputFile.current.value = '';
			inputFile.current.type = 'text';
			inputFile.current.type = 'file';
			setModalInput({...modalInput, transaction_bill: ''});
		};
	};

	const handleDeleteBill = () => {
		if (inputFile.current) {
			inputFile.current.value = '';
			inputFile.current.type = 'text';
			inputFile.current.type = 'file';
			setModalInput({...modalInput, transaction_bill: ''});
		};
		setModalInput({...modalInput, transaction_image: ''});
	};

	const handleSubmit = async (e) => {

		e.preventDefault();
		setLoad(true);
		const formTrans = new FormData(e.target);

		if (modalAdd) {
			if (modalInput.transaction_bill !== '' && modalInput.transaction_bill !== undefined) {
				formTrans.append('transaction_bill', modalInput.transaction_bill);
			};
			const res = await postTransaction(formTrans, token);
			if (res.response) {
				message.error(res.response.data.message);
				setLoad(false);
			} else {
				const data = await getTransactions(token);
				if (data) {
					setTransactions(data);
				};
				message.success('New transaction is posted!');
				setLoad(false);
				setModal(false);
			};
		} else {
			if ((modalInput.transaction_bill === '' || modalInput.transaction_bill === undefined) && modalInput.transaction_image === '') {
				formTrans.append('transaction_bill', '');
			} else if ((modalInput.transaction_bill !== '' && modalInput.transaction_bill !== undefined) && modalInput.transaction_image === '') {
				formTrans.append('transaction_bill', modalInput.transaction_bill);
			};
			const res = await putTransaction(modalInput.transaction_id, formTrans, token);
			if (res.response) {
				message.error(res.response.data.message);
				setLoad(false);
			} else {
				const data = await getTransactions(token);
				if (data) {
					setTransactions(data);
				};
				message.success('Transaction successfully updated');
				setLoad(false);
				setModal(false);
			};
		};
	};

	return (
		<div className='modal tra' style={modal ? styleModal : {}}>

			<button onClick={() => setModal(false)}>{'\u2716'}</button>

			<div className='form-header'>
				<button
					className={`form-plus ${modalForm === 'plus' && 'active'}`}
					onClick={() => {
						setModalForm('plus');
						modalInput.id_expense = '';
						modalInput.id_transfer = '';
					}}
				>Income</button>
				<button
					className={`form-minus ${modalForm === 'minus' && 'active'}`}
					onClick={() => {
						setModalForm('minus');
						modalInput.id_income = '';
						modalInput.id_transfer = '';
					}}
					>Expense</button>
				<button
					className={`form-empty ${modalForm === 'empty' && 'active'}`}
					onClick={() => {
						setModalForm('empty');
						modalInput.id_income = '';
						modalInput.id_expense = '';
					}}
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
						{accounts.length !== 0 && accounts.map(item => (
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
							{incomes.length !== 0 && incomes.map(item => (
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
							{expenses.length !== 0 && expenses.map(item => (
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
							{accounts.length !== 0 && accounts.map(item => (
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

				<button type='submit' >{modalAdd ? 'Add' : 'Save'}</button>
			</form>

			{modalInput.transaction_image === '' && (
				<div className='bill-input'>
					<label>
						Upload bill:
						<input
							type="file"
							name='transaction_bill'
							ref={inputFile}
							onChange={handleInputBill}
						/>
					</label>
					<button onClick={handleResetFile}>Clear File</button>
				</div>
			)}

			{modalInput.transaction_image !== '' &&
				<div className='bill-handle'>
					<button type="button" onClick={handleDeleteBill}>Delete / Change uploaded bill</button>
					<button type="button" onClick={() => setViewBill(true)}>View uploaded bill</button>
				</div>
			}

			{viewBill === true &&
				<div className='bill-image'>
					<button type="button" onClick={() => setViewBill(false)}>{'\u2716'}</button>
					<a href={modalInput.transaction_image}>
						<img src={modalInput.transaction_image} alt='bill' />
					</a>
				</div>
			}
		</div>
	);
};

export default TransactionModal;
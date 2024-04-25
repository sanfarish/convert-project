import { useContext, useEffect, useState } from 'react';
import TableTransactions from '../../table/TableTransactions';
import { TransactionsContext } from '../../../context/TransactionsContext';

function MainTransactions() {

	const {
		transactions,
		setPopup,
		setPopupAdd,
		setFormType,
		setPopupInput,
		datetimeFormat
	} = useContext(TransactionsContext);
	const [income, setIncome] = useState(0);
	const [expense, setExpense] = useState(0);

	useEffect(() => {
		setIncome(0);
		setExpense(0);
		transactions.forEach(item => {
			if (item.id_income !== '') {
				setIncome(prev => prev + item.transaction_amount);
			} else if (item.id_expense !== '') {
				setExpense(prev => prev + item.transaction_amount);
			};
		});
	}, [transactions]);

	function addPopup() {
		setPopupInput({
			transaction_time: datetimeFormat(new Date()),
			id_account: '',
			id_income: '',
			id_expense: '',
			id_transfer: '',
			transaction_amount: '',
			transaction_note: ''
		});
		setFormType('expense');
		setPopupAdd(true);
		setPopup(true);
	};

	return (
		<main className="main">
			<div className="table">
				<div className="data">
					<TableTransactions />
				</div>
			</div>
			<div className="add">
				<button id="add-btn" onClick={addPopup}>Add Transaction</button>
				<div className="add-notes">
					Notes: to edit/delete a transaction, use buttons in the transaction list!
				</div>
			</div>
			<div className="total">
				<div className="total-in">
					<header>Income</header>
					<span id="tot-in">Rp {income.toLocaleString()},-</span>
				</div>
				<div className="total-ex">
					<header>Expense</header>
					<span id="tot-ex">Rp {expense.toLocaleString()},-</span>
				</div>
				<div className="total-bal">
					<header>Total</header>
					<span id="tot-ba">Rp {(income - expense).toLocaleString()},-</span>
				</div>
			</div>
		</main>
	);
};

export default MainTransactions;
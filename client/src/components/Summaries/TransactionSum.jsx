import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../context/DataContext';
import './TransactionSum.css';

const TransactionSum = () => {

	const { transactions } = useContext(DataContext);
	const [income, setIncome] = useState(0);
	const [expense, setExpense] = useState(0);

	useEffect(() => {
		setIncome(0);
		setExpense(0);
		transactions.length !== 0 && transactions.forEach(item => {
			if (item.id_income !== '') {
				setIncome(prev => prev + item.transaction_amount);
			} else if (item.id_expense !== '') {
				setExpense(prev => prev + item.transaction_amount);
			};
		});
	}, [transactions]);

	return (
		<div className="card">
			<div className="sum">
			<span>Income</span>
				<span>Rp {income.toLocaleString()},-</span>
			</div>
			<div className="sum">
				<span>Expense</span>
				<span>Rp {expense.toLocaleString()},-</span>
			</div>
			<div className="sum">
				<span>Total</span>
				<span>Rp {(income - expense).toLocaleString()},-</span>
			</div>
		</div>
	);
};

export default TransactionSum;
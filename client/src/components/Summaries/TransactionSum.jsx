import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../context/GlobalContext';

const TransactionSum = () => {

	const { transactions } = useContext(GlobalContext);
	const [income, setIncome] = useState(0);
	const [expense, setExpense] = useState(0);

	useEffect(() => {
		setIncome(0);
		setExpense(0);
		transactions && transactions.forEach(item => {
			if (item.id_income !== '') {
				setIncome(prev => prev + item.transaction_amount);
			} else if (item.id_expense !== '') {
				setExpense(prev => prev + item.transaction_amount);
			};
		});
	}, [transactions]);

	return (
		<div className="summary">
			<div className="sum-in">
				Income
				<span>Rp {income.toLocaleString()},-</span>
			</div>
			<div className="sum-out">
				Expense
				<span>Rp {expense.toLocaleString()},-</span>
			</div>
			<div className="sum-tot">
				Total
				<span>Rp {(income - expense).toLocaleString()},-</span>
			</div>
		</div>
	);
};

export default TransactionSum;
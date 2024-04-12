import { useContext, useState, useEffect } from 'react'
import { CategoriesContext } from '../../context/CategoriesContext';

function TableExpenses() {

	const {
		expenses,
		setPopup,
		setPopupType,
		setPopupCategory,
		setPopupInput,
		setUpdateID,
		getExpensesData,
		deleteExpenseData,
		transactions
	} = useContext(CategoriesContext);
	const [transactionsExpenses, setTransactionsExpenses] = useState([]);

	useEffect(() => {

		getExpensesData();
		setTransactionsExpenses([]);

		transactions.forEach(item => {
			if (item.id_expense !== '') {
				setTransactionsExpenses(prev => [...prev, item.id_expense]);
			};
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [transactions]);

	const editExpensePopup = (name, id) => {
		setPopup(true);
		setPopupType('edit');
		setPopupCategory('expense');
		setPopupInput(name);
		setUpdateID(id);
	};

	const handleDeleteExpense = async (id) => {
		if (transactionsExpenses.includes(id)) {
			alert('Cannot delete category that is in use on transactions!');
		} else {
			deleteExpenseData(id);
		};
	};

	function Render({ Item }) {
		return(
			<>
				<div className="id">
					<div className="name">{Item.expense_name}</div>
					<div className="edit-wrapper">
						<button className="edit-expense-btn" onClick={() => editExpensePopup(
							Item.expense_name,
							Item.expense_id
						)}>Edit</button>
					</div>
					<div className="del-wrapper">
						<button className="del-btn" onClick={() => handleDeleteExpense(Item.expense_id)}>Delete</button>
					</div>
				</div>
				<div className="space"></div>
			</>
		);
	};

	return (
		expenses.map(item => {
			return(
				item.expense_id !== '' && <Render Item={item} key={item.expense_id} />
			);
		})
	);

};

export default TableExpenses;
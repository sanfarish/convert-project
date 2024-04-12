import { useContext, useEffect } from 'react';
import { CategoriesContext } from '../../../context/CategoriesContext';
import TableIncomes from '../../table/TableIncomes';
import TableExpenses from '../../table/TableExpenses';

function MainCategories() {

	const {
		setPopup,
		setPopupType,
		setPopupCategory,
		setPopupInput,
		getTransactionsData
	} = useContext(CategoriesContext);

	useEffect(() => {
		getTransactionsData();
	}, []);

	function addIncomePopup() {
		setPopup(true);
		setPopupType('add');
		setPopupCategory('income');
		setPopupInput('');
	};

	function addExpensePopup() {
		setPopup(true);
		setPopupType('add');
		setPopupCategory('expense');
		setPopupInput('');
	};

	return (
		<main className="main">
			<div className="table">
				<header>Income Category</header>
				<div className="data-income">
					<TableIncomes />
				</div>
			</div>
			<div className="income-add">
				<button id="add-income-btn" onClick={addIncomePopup}>Add Income Category</button>
			</div>
			<div className="table">
				<header>Expense Category</header>
				<div className="data-expense">
					<TableExpenses />
				</div>
			</div>
			<div className="expense-add">
				<button id="add-expense-btn" onClick={addExpensePopup}>Add Expense Category</button>
			</div>
		</main>
	);

};

export default MainCategories;
import React, { useContext, useEffect, useState } from 'react';
import { CategoriesContext } from '../../context/CategoriesContext';

function PopupCategories() {

	const {
		incomes,
		expenses,
		popup,
		setPopup,
		popupType,
		popupCategory,
		popupInput,
		setPopupInput,
		updateID,
		postIncomeData,
		postExpenseData,
		putIncomeData,
		putExpenseData
	} = useContext(CategoriesContext);
	const [incomesName, setIncomesName] = useState([]);
	const [expensesName, setExpensesName] = useState([]);

	useEffect(() => {

		setIncomesName([]);
		setExpensesName([]);

		incomes.forEach(item => {
			if (item.income_name !== '') {
				setIncomesName(prev => [...prev, item.income_name]);
			};
		});

		expenses.forEach(item => {
			if (item.expense_name !== '') {
				setExpensesName(prev => [...prev, item.expense_name]);
			};
		});

	}, [incomes, expenses]);

	function closePopup() {
		setPopup(false);
	};

	const handleAddIncome = async() => {
		if (popupInput.trim() === '') {
			alert('Name cannot being empty!');
		} else {
			if (incomesName.includes(popupInput)) {
				alert('There are already category with that name! Change with another unique name!');
			} else {
				await postIncomeData(popupInput.trim());
				setPopup(false);
			};
		};
	};

	const handleAddExpense = async() => {
		if (popupInput.trim() === '') {
			alert('Name cannot being empty!');
		} else {
			if (expensesName.includes(popupInput)) {
				alert('There are already category with that name! Change with another unique name!');
			} else {
				await postExpenseData(popupInput.trim());
				setPopup(false);
			};
		};
	};

	const handleEditIncome = async() => {
		if (popupInput.trim() === '') {
			alert('Name cannot being empty!');
		} else {
			if (incomesName.includes(popupInput)) {
				alert('There are already category with that name! Change with another unique name!');
			} else {
				await putIncomeData(popupInput.trim(), updateID);
				setPopup(false);
			};
		};
	};

	const handleEditExpense = async() => {
		if (popupInput.trim() === '') {
			alert('Name cannot being empty!');
		} else {
			if (expensesName.includes(popupInput)) {
				alert('There are already category with that name! Change with another unique name!');
			} else {
				await putExpenseData(popupInput.trim(), updateID);
				setPopup(false);
			};
		};
	};

	return (
		<div className={`popup ${popup ? "active" : ""} ${popupType}`}>
			<button id="close-btn" onClick={closePopup}>x</button>
			<div className={`form ${popupCategory}`}>
				<div className="form-header">
					<div>Add Income:</div>
					<div>Add Expense:</div>
					<div>Edit Income:</div>
					<div>Edit Expense:</div>
				</div>
				<div className="form-content">
					<div className="form-input">
						<label htmlFor="name">Name:</label>
						<input
							type="text"
							id="name"
							value={popupInput}
							onChange={e => setPopupInput(e.target.value)}
							autoComplete="name"
						/>
					</div>
				</div>
				<button id="save-add-income-btn" onClick={handleAddIncome}>Add</button>
				<button id="save-add-expense-btn" onClick={handleAddExpense}>Add</button>
				<button id="save-edit-income-btn" onClick={handleEditIncome}>Edit</button>
				<button id="save-edit-expense-btn" onClick={handleEditExpense}>Edit</button>
			</div>
		</div>
	);

};

export default PopupCategories;
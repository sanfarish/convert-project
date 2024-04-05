import React from 'react';

function PopupCategories() {
	return (
		<div className="popup">
			<button id="close-btn">x</button>
			<div className="form">
				<div className="form-header">
					<div>Add Income:</div>
					<div>Add Expense:</div>
					<div>Edit Income:</div>
					<div>Edit Expense:</div>
				</div>
				<div className="form-content">
					<div className="form-input">
						<label htmlFor="name">Name:</label>
						<input type="text" id="name" autoComplete="name" />
					</div>
				</div>
				{/* <button id="save-add-income-btn" onClick={addIncome()}>Add</button>
				<button id="save-add-expense-btn" onClick={addExpense()}>Add</button> */}
				<button id="save-add-income-btn">Add</button>
				<button id="save-add-expense-btn">Add</button>
				<button id="save-edit-income-btn">Edit</button>
				<button id="save-edit-expense-btn">Edit</button>
			</div>
		</div>
	);
};

export default PopupCategories;
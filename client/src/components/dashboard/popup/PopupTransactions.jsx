import React from 'react';

function PopupTransactions() {
	return (
		<div className="popup">
			<button id="close-btn">x</button>
			<div className="form expense">
				<div className="form-header">
					<div className="income-head">Income</div>
					<div className="expense-head">Expense</div>
					<div className="transfer-head">Transfer</div>
				</div>
				<div className="form-content">
					<div className="form-input">
						<label htmlFor="datetime">Date/Time:</label>
						<input type="datetime-local" id="datetime" />
					</div>
					<div className="form-input">
						<label htmlFor="account">Account:</label>
						<select id="account"></select>
					</div>
					<div className="form-input">
						<label htmlFor="category-income">Category:</label>
						<select id="category-income"></select>
					</div>
					<div className="form-input">
						<label htmlFor="category-expense">Category:</label>
						<select id="category-expense"></select>
					</div>
					<div className="form-input">
						<label htmlFor="to">To:</label>
						<select id="to"></select>
					</div>
					<div className="form-input">
						<label htmlFor="amount">Amount:</label>
						<input type="number" id="amount" />
					</div>
					<div className="form-input">
						<label htmlFor="note">Note:</label>
						<input type="text" id="note" />
					</div>
				</div>
				{/* <button id="save-add-btn" onClick={addTransaction()}>Add</button> */}
				<button id="save-add-btn">Add</button>
				<button id="save-edit-btn">Save</button>
			</div>
		</div>
	);
};

export default PopupTransactions;
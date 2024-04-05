import React from 'react';

function MainTransactions() {
	return (
		<main className="main">
			<div className="table">
				<div className="data"></div>
			</div>
			<div className="add">
				<button id="add-btn">Add Transaction</button>
				<div className="add-notes">
					Notes: to edit/delete a transaction, use buttons in the transaction list!
				</div>
			</div>
			<div className="total">
				<div className="total-in">
					<header>Income</header>
					<span id="tot-in">Rp 0,-</span>
				</div>
				<div className="total-ex">
					<header>Expense</header>
					<span id="tot-ex">Rp 0,-</span>
				</div>
				<div className="total-bal">
					<header>Total</header>
					<span id="tot-ba">Rp 0,-</span>
				</div>
			</div>
		</main>
	);
};

export default MainTransactions;
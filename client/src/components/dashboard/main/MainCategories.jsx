import React from 'react';

function MainCategories() {
	return (
		<main className="main">
			<div className="table">
				<header>Income Category</header>
				<div className="data-income"></div>
			</div>
			<div className="income-add">
				<button id="add-income-btn">Add Income Category</button>
			</div>
			<div className="table">
				<header>Expense Category</header>
				<div className="data-expense"></div>
			</div>
			<div className="expense-add">
				<button id="add-expense-btn">Add Expense Category</button>
			</div>
		</main>
	);
};

export default MainCategories;
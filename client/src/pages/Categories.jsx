import { useEffect } from 'react';
import IncomeTable from '../components/Tables/IncomeTable';
import ExpenseTable from '../components/Tables/ExpenseTable';
import IncomeAdd from '../components/Buttons/IncomeAdd';
import ExpenseAdd from '../components/Buttons/ExpenseAdd';
import './Categories.css';

const Categories = () => {

	useEffect(() => {
		document.title = 'Categories | Expense Manager';
	}, []);

	return (
		<main className='categories'>
			<IncomeTable />
			<IncomeAdd />
			<ExpenseTable />
			<ExpenseAdd />
		</main>
	);
};

export default Categories;
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import Header from '../components/Header';
import Nav from '../components/Nav';
import IncomeTable from '../components/Tables/IncomeTable';
import ExpenseTable from '../components/Tables/ExpenseTable';
import IncomeAdd from '../components/Buttons/IncomeAdd';
import ExpenseAdd from '../components/Buttons/ExpenseAdd';
import CategoryModal from '../components/Modals/CategoryModal';
import Loader from '../components/Loader';
// import '../css/category/dashboard.css';
// import '../css/category/table.css';
// import '../css/category/button.css';
// import '../css/category/modal.css';

const Categories = () => {

	const { modal } = useContext(GlobalContext);
	const styleBlur = {
		filter: 'blur(2px) brightness(75%)',
		transition: '0.4s',
		pointerEvents: 'none',
		userSelect: 'none'
	};

	useEffect(() => {
		document.title = 'Categories | Expense Manager';
	}, []);

	return (
		<div className='categories'>
			<div className='dashboard' style={modal ? styleBlur : {}}>
				<Header Title="Categories" />
				<Nav />
				<main>
					<IncomeTable />
					<IncomeAdd />
					<ExpenseTable />
					<ExpenseAdd />
				</main>
			</div>
			<CategoryModal />
			<Loader />
		</div>
	);
};

export default Categories;
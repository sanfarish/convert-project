import { useContext, useEffect } from 'react';
import { CategoriesContext } from '../context/CategoriesContext';
import '../css/dashboard.css';
import '../css/categories/main.css';
import '../css/categories/popup.css';
import '../css/categories/table.css';
import Header from '../components/dashboard/Header';
import Nav from '../components/dashboard/Nav';
import Main from '../components/dashboard/main/MainCategories';
import Popup from '../components/popup/PopupCategories';

const Categories = () => {

	const { popup } = useContext(CategoriesContext);
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
			<div className='dashboard' style={popup ? styleBlur : {}}>
				<Header Title="Categories" />
				<Main />
				<Nav />
			</div>
			<Popup />
		</div>
	);
};

export default Categories;
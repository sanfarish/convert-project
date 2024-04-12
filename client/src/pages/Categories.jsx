import { useContext, useEffect } from 'react';
import { CategoriesContext } from '../context/CategoriesContext';
import '../css/dashboard.css';
import '../css/categories/main.css';
import '../css/categories/popup.css';
import '../css/categories/table.css';
import Header from '../components/dashboard/Header';
import Nav from '../components/dashboard/Nav';
import Main from '../components/dashboard/main/MainCategories';
import Popup from '../components/dashboard/popup/PopupCategories';

const Categories = () => {

	const { popup } = useContext(CategoriesContext);

	useEffect(() => {
		document.title = 'Categories | Expense Manager';
	}, []);

	function popupBlur() {
		return popup ? 'blur' : '';
	};

	return (
		<div className='categories'>
			<div className={`view ${popupBlur()}`}>
				<Header Title="Categories" />
				<Main />
				<Nav />
			</div>
			<Popup />
		</div>
	);
};

export default Categories;